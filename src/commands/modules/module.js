const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const aiSchema = require("../../models/chatbot");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("modules")
    .setDescription("See the enabled modules in the server"),
  async execute(interaction, client) {
    const embed = new EmbedBuilder()
      .setColor(client.colour)
      .setTimestamp()
      .setFooter({ text: `Requested in ${interaction.guild}.` })
      .setDescription("All modules: ");
    const AIdata = await aiSchema.findOne({
      Guild: interaction.guild.id,
    });
    if (AIdata)
      embed.addFields({
        name: `AI Chat Bot: ${client.success}`,
        value: `\u200b`,
      });
    if (!AIdata)
      embed.addFields({
        name: `AI Chat Bot: ${client.error}`,
        value: `\u200b`,
      });
    await interaction.reply({
      embeds: [embed],
    });
  },
};
