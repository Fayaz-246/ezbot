const {
  SlashCommandBuilder,
  EmbedBuilder,
  PermissionFlagsBits,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("serverinfo")
    .setDescription("Gives some information about the server"),
  async execute(interaction, client) {
    const { guild } = interaction;
    const { members } = guild;
    const { name, ownerId, createdTimestamp, memberCount } = guild;
    const icon =
      guild.iconURL() ||
      "https://media.discordapp.net/attachments/978035586168418334/978304826351943800/unnamed.png";
    const roles = guild.roles.cache.size;
    const emojis = guild.emojis.cache.size;
    const id = guild.id;

    let baseVerification = guild.verificationLevel;
    if (baseVerification == 0) baseVerification = "None";
    if (baseVerification == 1) baseVerification = "Low";
    if (baseVerification == 2) baseVerification = "Medium";
    if (baseVerification == 3) baseVerification = "High";
    if (baseVerification == 4) baseVerification = "Very High";

    const em = new EmbedBuilder()
      .setColor(client.colour)
      .setThumbnail(icon)
      .setAuthor({ name: name, iconURL: icon })
      .setFooter({ text: `Server ID: ${id}` })
      .addFields(
        { name: "Name: ", value: name, inline: false },
        {
          name: "Date Created",
          value: `<t:${parseInt(
            createdTimestamp / 1000
          )}:R> ( hover for complete date)`,
          inline: true,
        },
        {
          name: "<:Crown:1127592317361070080> Server Owner",
          value: `<@${ownerId}>`,
          inline: true,
        },
        {
          name: "<:Members:1127547929989750885> Server Members",
          value: `${memberCount}`,
          inline: true,
        },
        {
          name: "<:discord:1127548301554753567> Role Count",
          value: `${roles}`,
          inline: true,
        },
        {
          name: "<a:blob_party:1127592213422022686> Emoji Count",
          value: `${emojis}`,
          inline: true,
        },
        {
          name: "<a:boost:1127592746794885261> Server Boosts",
          value: `${guild.premiumSubscriptionCount}`,
          inline: true,
        },
        {
          name: "<a:verified:1127592879628484669> Verification Level",
          value: `${baseVerification}`,
          inline: true,
        }
      );

    interaction.reply({ embeds: [em] });
  },
};
