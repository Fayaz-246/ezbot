const { SlashCommandBuilder, EmbedBuilder, codeBlock } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Shows API Latency / Bot ping"),
  async execute(interaction, client) {
    const message = await interaction.deferReply({
      fetchReply: true,
    });
    const emBed = new EmbedBuilder()
      .setTitle("Pong! 🏓")
      .setColor(client.colour)
      .addFields(
        {
          name: "API Latency: ",
          value: codeBlock(`${client.ws.ping}ms`),
          inline: true,
        },
        {
          name: "Bot Latency: ",
          value: codeBlock(
            `${message.createdTimestamp - interaction.createdTimestamp}ms`
          ),
          inline: true,
        }
      )
      .setTimestamp()
      .setThumbnail(client.user.avatarURL())
      .setFooter({ text: "Returned Ping!", iconURL: client.user.avatarURL() });
    await interaction.editReply({
      embeds: [emBed],
    });
  },
};
