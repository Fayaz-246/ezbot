module.exports = {
  data: {
    name: "test",
  },
  async execute(interaction, client) {
    await interaction.reply({
      content: `Ye so this works :p`,
    });
  },
};
