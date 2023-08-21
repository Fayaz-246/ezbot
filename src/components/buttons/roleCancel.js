const { EmbedBuilder } = require("discord.js");
module.exports = {
  data: {
    name: "roleCancel",
  },
  async execute(interaction, client) {
    const { ce } = client;
    const embed = new EmbedBuilder()
      .setColor(ce)
      .setDescription("Prompt Cancelled");

    await interaction.deferUpdate();
    await interaction.editReply({
      embeds: [embed],
      components: [],
    });
  },
};
