const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("membercount")
    .setDescription("Shows the current servers membercount"),
  async execute(interaction, client) {
    const guild = interaction.guild;
    const mc = guild.memberCount;
    const bots = guild.members.cache.filter((m) => m.user.bot).size;
    const embed = new EmbedBuilder()
      .setColor(client.colour)
      .setTimestamp()
      .setThumbnail(guild.iconURL())
      .setDescription(
        `**Total:** ${mc}\n**Humans:** ${mc - bots}\n**Bots:** ${bots}`
      );

    interaction.reply({
      embeds: [embed],
    });
  },
};
