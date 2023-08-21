const {
  SlashCommandBuilder,
  EmbedBuilder,
  StringSelectMenuBuilder,
  StringSelectMenuOptionBuilder,
  ActionRowBuilder,
} = require("discord.js");

const { modEm, comEm, utilEm, servEm } = require("../../embeds/helpEm");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Help command"),

  async execute(interaction) {
    const slct = new StringSelectMenuBuilder()
      .setCustomId("help")
      .setPlaceholder("Choose a category")
      .setOptions(
        new StringSelectMenuOptionBuilder()
          .setLabel("Community Commands")
          .setDescription("Show the community commands for this bot")
          .setEmoji("<:Members:1126868745034412122>")
          .setValue("com"),
        new StringSelectMenuOptionBuilder()
          .setLabel("Guild Commands")
          .setDescription("Show the server commands for this bot")
          .setEmoji("🏠")
          .setValue("serv"),
        new StringSelectMenuOptionBuilder()
          .setLabel("Moderation Commands")
          .setDescription("Show the moderation commands for this bot")
          .setEmoji("<:mod:1126826141668356136>")
          .setValue("mod"),
        new StringSelectMenuOptionBuilder()
          .setLabel("Utility Commands")
          .setDescription("Show the utility commands for this bot")
          .setEmoji("<:Slash:1126827903968092230>")
          .setValue("util")
      );

    const embed = new EmbedBuilder()
      .setTitle("Choose a category")
      .setDescription(
        "Choose one of the following categories to see my commands!"
      );
    const row = new ActionRowBuilder().setComponents(slct);
    const filter = (i) => i.user.id === interaction.user.id;
    const msg = await interaction.reply({ embeds: [embed], components: [row] });
    const collector = msg.createMessageComponentCollector({
      filter,
      time: 60_000,
    });

    collector.on("collect", async (i) => {
      if (!i.isStringSelectMenu()) return;

      if (i.customId === "help") {
        const slct = i.values[0];

        if (slct === "mod") {
          await i.reply({ embeds: [modEm], ephemeral: true });
        }
        if (slct === "serv") {
          await i.reply({ embeds: [servEm], ephemeral: true });
        }
        if (slct === "com") {
          await i.reply({ embeds: [comEm], ephemeral: true });
        }
        if (slct === "util") {
          await i.reply({ embeds: [utilEm], ephemeral: true });
        }
      }
    });

    collector.on("end", async (i) => {
      const eq = new EmbedBuilder().setDescription(
        "** Help Embed Timed-Out [ Re-Run the command if you want to use the menu again ] **"
      );
      interaction.editReply({
        embeds: [eq],
        components: [],
      });
    });
  },
};
