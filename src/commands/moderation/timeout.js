const {
  SlashCommandBuilder,
  EmbedBuilder,
  PermissionFlagsBits,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("timeout")
    .setDescription("Timeout the member")
    .addUserOption((opti) =>
      opti
        .setName("member")
        .setDescription(
          "The member you want to timeout/remeove the timeout from"
        )
        .setRequired(true)
    )
    .addStringOption((opti) =>
      opti
        .setName("time")
        .setDescription(
          "For how long the timeout should be. Leave blank to remove timeout. Eg - 5m, 1s, 2h, 8d"
        )
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),
  async execute(interaction, client) {
    const { options } = interaction;
    const t = options.getUser("member");
    const member = options.getMember("member");
    const { cs, success } = client;
    const time = options.getString("time") || null;
    if (time === null) {
      const em = new EmbedBuilder()
        .setTitle(`Successfully untimed-out ${t.username}`)
        .setDescription(`Removed timeout from <@${member.id}> ${success}`)
        .setColor(cs)
        .setTimestamp();

      await member.timeout(time).then(interaction.reply({ embeds: [em] }));
    } else {
      if (member.id === interaction.guild.ownerId)
        return interaction.reply({
          content: `What ya tryna do....`,
        });
      if (
        member.roles.highest.poistion >=
        interaction.member.roles.highest.position
      )
        return interaction.reply({
          content: `This user has higher roles than you, thus you cannot timeout them`,
        });
      let t1;
      const time1 = time.slice(0, -1);
      if (
        !["d", "D", "s", "S", "h", "H", "m", "M"].some((style) =>
          time.endsWith(style)
        )
      )
        return interaction.reply({
          content: "Invalid time.",
          ephemeral: true,
        });
      if (time.endsWith("m") || time.endsWith("M")) t1 = time1 * 60 * 1000;
      if (time.endsWith("s") || time.endsWith("S")) t1 = time1;
      if (time.endsWith("h") || time.endsWith("H")) t1 = time1 * 60 * 1000;
      if (time.endsWith("d") || time.endsWith("D"))
        t1 = time1 * 24 * 60 * 60 * 1000;
      const em = new EmbedBuilder()
        .setTitle(`Successfully timed-out ${t.username}`)
        .setDescription(
          `Set timeout for <@${member.id}> for \`${time}\` ${success}`
        )
        .setColor(cs)
        .setTimestamp();

      await member.timeout(t1).then(interaction.reply({ embeds: [em] }));
      try {
        member.message({
          contents: `You have been timed out in ${interaction.guild} for ${time}.`,
        });
      } catch (err) {
        return;
      }
    }
  },
};
