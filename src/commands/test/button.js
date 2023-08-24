const {
  SlashCommandBuilder,
  EmbedBuilder,
  PermissionFlagsBits,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("button")
    .setDescription("Button test."),
  async execute(interaction) {
    const btn = new ButtonBuilder()
      .setCustomId("test")
      .setEmoji("🍃")
      .setLabel("Click for ;)")
      .setStyle(ButtonStyle.Success);

    await interaction.reply({
      components: [new ActionRowBuilder().addComponents(btn)],
    });
  },
};
