const {
  SlashCommandBuilder,
  EmbedBuilder,
  PermissionFlagsBits,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("kick")
    .setDescription("Kick the given user from the server")
    .addUserOption((op) =>
      op
        .setName("user")
        .setDescription("The member you want to kick")
        .setRequired(true)
    )
    .addStringOption((op) =>
      op
        .setName("reason")
        .setDescription("The reason for the kick")
        .setRequired(false)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),
  async execute(interaction, client) {
    const { options } = interaction;
    const t = options.getUser("user");
    const { cs, ce, error, success } = client;
    const memb = options.getMember("user");
    const reason = options.getString("reason") || "No reason provided.";
    if (memb.id === interaction.guild.ownerId)
      return interaction.reply({
        content: `What ya tryna do....`,
      });
    if (
      memb.roles.highest.poistion >= interaction.member.roles.highest.position
    )
      return interaction.reply({
        content: `This user has higher roles than you, thus you cannot kick them`,
      });

    const emBan = new EmbedBuilder()
      .setColor(cs)
      .setTitle(`User has been kicked [${t.tag}]`)
      .setDescription(
        `<@${memb.id}> has been kicked from ${interaction.guild.name} by ${interaction.user.tag} ${success}.\n For the reason: \`${reason}\``
      )
      .setTimestamp();
    const em2 = new EmbedBuilder()
      .setColor(ce)
      .setTitle(`You have been kicked in [${interaction.guild.name}]`)
      .setDescription(
        `You have been kick from ${interaction.guild.name} by ${interaction.user.tag} ${error}.\n For the reason: \`${reason}\``
      )
      .setTimestamp();
    try {
      memb.send({ embeds: [em2] });
      await memb
        .kick({ reason: reason })
        .then((result) => {
          interaction.reply({ embeds: [emBan] });
        })
        .catch((err) => {
          return;
        });
    } catch (err) {
      interaction.reply({
        content: `There was an error purging the messages, probably because i dont have the correct permissions. ${error}`,
        ephemeral: true,
      });
      console.error(`Missing permissions`);
    }
  },
};
