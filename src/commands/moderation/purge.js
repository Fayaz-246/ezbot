const {
  SlashCommandBuilder,
  EmbedBuilder,
  PermissionFlagsBits,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("purge")
    .setDescription("Delete/purge the amount of messages specified")
    .addIntegerOption((option) =>
      option
        .setName("amount")
        .setDescription("The amount of messages to purge.")
        .setRequired(true)
        .setMinValue(1)
        .setMaxValue(100)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels),
  async execute(interaction, client) {
    const amount = interaction.options.getInteger("amount");
    let mVar = amount > 1 ? "messages" : "message";
    const { success, cs } = client;
    const channel = interaction.channel;
    const em = new EmbedBuilder()
      .setColor(cs)
      .setDescription(`Succesfully purged **${amount} ${mVar}** ${success}`);

    channel
      .bulkDelete(amount, true)
      .then(() => {
        interaction.reply({ embeds: [em] });
        setTimeout(() => interaction.deleteReply(), 5000);
      })
      .catch((err) => {
        interaction.reply({
          content: `There was an error purging the messages, probably because i dont have the correct permissions. ${client.error}`,
          ephemeral: true,
        });
        console.error(`Missing permissions`);
      });
  },
};
