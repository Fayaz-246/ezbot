const {
  SlashCommandBuilder,
  EmbedBuilder,
  PermissionFlagsBits,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("unlock")
    .setDescription("removes the lockdown from the current channel")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels),
  async execute(interaction, client) {
    const { success, error, cs } = client;
    const em = new EmbedBuilder()
      .setColor(cs)
      .setDescription(
        `Successfully removed locked down on <#${interaction.channel.id}> ${success}`
      );
    interaction.deferReply({ ephemeral: false }).then(() => {
      interaction.channel.permissionOverwrites
        .edit(interaction.guild.id, {
          SendMessages: true,
        })
        .then(() => {
          interaction.editReply({ embeds: [em], ephemeral: false });
        })
        .catch((err) => {
          interaction.editReply({
            content: `There was an error removing the lockdown, probably because i dont have the correct permissions. ${client.error}`,
            ephemeral: true,
          });
          console.error(`Missing permissions`);
        });
    });
  },
};
