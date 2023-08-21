const {
  SlashCommandBuilder,
  EmbedBuilder,
  PermissionFlagsBits,
  discordSort,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("whois")
    .setDescription("Get some info about a member")
    .addUserOption((opt) =>
      opt.setName("user").setDescription("The member you want to get info on.")
    ),
  async execute(interaction, client) {
    const { options, guild } = interaction;
    const user = options.getUser("user") || interaction.user;
    const memb = options.getMember("user") || interaction.member; // for roles and server joined date
    const tag = user.username;
    const id = user.id;
    const boosted = memb.premiumSince ? "Yes" : "No";
    const nick = user.nickname || "None";
    const bot = user.bot ? "Yes" : "No";
    const roles = memb.roles.cache.map((r) => r).join(" ");
    const r = roles; //.slice(0, -9);
    const discoCreate = parseInt(user.createdAt / 1000);
    const serverJoined = parseInt(memb.joinedAt / 1000);
    const icon = user.displayAvatarURL();

    const em = new EmbedBuilder()
      .setTitle(`User - ${tag}`)
      .setFooter({ text: `User ID - ${id}`, iconURL: `${icon}` })
      .setTimestamp()
      .setThumbnail(icon)
      .addFields(
        {
          name: "Joined Discord ~",
          value: `<t:${discoCreate}:R>`,
          inline: true,
        },
        {
          name: "Joined Server ~",
          value: `<t:${serverJoined}:R>`,
          inline: true,
        },
        { name: "Server Nick-Name ~", value: `${nick}` },
        { name: "Is A Bot? ", value: `${bot}` },
        { name: "Booster? ", value: `${boosted}` },
        { name: "Roles - ", value: `${r}` }
      );

    interaction.reply({ embeds: [em] });
  },
};
