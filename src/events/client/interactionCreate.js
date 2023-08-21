const { errEm } = require("../../embeds/errEm");

module.exports = {
  name: "interactionCreate",
  async execute(interaction, client) {
    if (interaction.isChatInputCommand()) {
      const { commands } = client;
      const { commandName } = interaction;
      const command = commands.get(commandName);
      if (!command) return;
      try {
        await command.execute(interaction, client);
      } catch (err) {
        console.error(err);
        await interaction.reply({
          embeds: [errEm],
          ephemeral: true,
        });
      }
    } else if (interaction.isButton()) {
      const { buttons } = client;
      const { customId } = interaction;
      const button = buttons.get(customId);
      if (!button) return new Error("There is no kode for this button");
      try {
        await button.execute(interaction, client);
      } catch (err) {
        interaction.reply({
          embeds: [errEm],
          ephemeral: true,
        });
        console.error(err);
      }
    }
  },
};
