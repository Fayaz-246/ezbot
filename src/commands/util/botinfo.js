const {
  SlashCommandBuilder,
  EmbedBuilder,
  PermissionFlagsBits,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  embedLength,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("botinfo")
    .setDescription("Gives some info about the bot!"),
  async execute(interaction, client) {
    const name = `${client.user.username}`;
    const icon = `${client.user.displayAvatarURL()}`;
    let totalMembers = client.guilds.cache.reduce(
      (acc, guild) => acc + guild.memberCount,
      0
    );

    let totalSeconds = client.uptime / 1000;
    let days = Math.floor(totalSeconds / 86400);
    totalSeconds %= 86400;
    let hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = Math.floor(totalSeconds % 60);

    let uptime = `${days} Days, ${hours} Hours, ${minutes} Minutes & ${seconds} seconds`;
    let ping = `${Date.now() - interaction.createdTimestamp}ms`;

    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setLabel("Support Server")
        .setStyle(ButtonStyle.Link)
        .setURL("https://discord.gg/CaB8wcrtcR"),

      new ButtonBuilder()
        .setLabel("Invite The Bot")
        .setStyle(ButtonStyle.Link)
        .setURL(
          "https://discord.com/api/oauth2/authorize?client_id=1126571121580445726&permissions=70368744177655&scope=applications.commands%20bot"
        )
    );

    const em = new EmbedBuilder()
      .setColor(client.colour)
      .setAuthor({ name: name, iconURL: icon })
      .setThumbnail(`${icon}`)
      .setFooter({ text: `Bot ID: 1126571121580445726` })
      .setTimestamp()
      .addFields(
        {
          name: "Server Count: ",
          value: `${client.guilds.cache.size}`,
          inline: true,
        },
        { name: "Member Count: ", value: `${totalMembers}`, inline: true },
        { name: "Latency: ", value: `${ping}`, inline: true },
        { name: "Uptime: ", value: `\`\`\`${uptime}\`\`\``, inline: true }
      );

    await interaction.reply({
      embeds: [em],
      components: [row],
    });
  },
};
