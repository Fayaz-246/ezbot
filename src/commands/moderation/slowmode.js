const {
  SlashCommandBuilder,
  PermissionFlagsBits,
  EmbedBuilder,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("slowmode")
    .setDescription("Set the slowmode for the current channel")
    .addIntegerOption((option) =>
      option
        .setName("time")
        .setDescription(
          "Time in seconds if you want to remove the slowmode don't add time leave it blank"
        )
        .setRequired(false)
        .setMinValue(1)
        .setMaxValue(1000)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels),
  async execute(interaction, client) {
    const channel = interaction.channel;
    let time = interaction.options.getInteger("time");
    if (!time) {
      time = 0;
    }
    const em = new EmbedBuilder()
      .setColor(client.cs)
      .setDescription(
        `Set the slowmode for the current channel as **${time} seconds** ${client.success}`
      );

    await channel
      .setRateLimitPerUser(time)
      .then(() => {
        interaction.reply({ embeds: [em] });
      })
      .catch((err) => {
        interaction.reply({
          content: `There was an error setting the slowmode, probably because i dont have the correct permissions. ${client.error}`,
          ephemeral: true,
        });
        console.error(`Missing permissions`);
      });
  },
};
