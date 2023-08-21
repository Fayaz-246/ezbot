const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder().setName("test").setDescription("Test CMD"),
  async execute(interaction, client) {
    const em = new EmbedBuilder()
      .setTitle("W")
      .setDescription("Test command works :test_tube:")
      .setThumbnail(client.user.avatarURL())
      .setColor(client.colour);
    interaction.reply({
      embeds: [em],
    });
  },
};
