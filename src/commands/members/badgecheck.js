const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("badges")
    .setDescription("Get the badges of a user")
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("The user you want to get the badge info from")
    ),
  async execute(interaction, client) {
    const { options } = interaction;
    await interaction.deferReply();

    let user = options.getUser("user");
    if (!user) user = interaction.user;
    let memb = await interaction.guild.members.cache.get(user.id);
    let flags = user.flags.toArray();

    let badges = [];
    let extraBadges = [];

    if (user.id === "889068372426383361")
      badges.push("<:Crown:1127592317361070080> || Owner Lmao");
    if (user.id === "1092463679817130044")
      badges.push(":ghost: The only shadow");
    await Promise.all(
      flags.map(async (badge) => {
        if (badge === "Staff")
          badges.push("<:DiscordStaff:1127566463553785866>");
        if (badge === "Partner") badges.push("<:Partner:1127566494969122857>");
        if (badge === "CertifiedModerator")
          badges.push("<:CertifiedModerator:1127566458633854997>");
        if (badge === "Hypesquad")
          badges.push("<:Hypesquad:1127566474928717834>");
        if (badge === "HypeSquadOnlineHouse1")
          badges.push("<:Bravery:1127566525914681364>");
        if (badge === "HypeSquadOnlineHouse2")
          badges.push("<:Brilliance:1127566530637467808>");
        if (badge === "HypeSquadOnlineHouse3")
          badges.push("<:Balance:1127566520961204305>");
        if (badge === "BugHunterLevel1")
          badges.push("<:BugHunter1:1127566453613277205>");
        if (badge === "BugHunterLevel2")
          badges.push("<:BugHunter2:1127566479802515456>");
        if (badge === "ActiveDeveloper")
          badges.push("<:ActiveDeveloper:1127566516183904267>");
        if (badge === "VerifiedDeveloper")
          badges.push("<:VerifiedBotDeveloper:1127566510840356994>");
        if (badge === "PremiumEarlySupporter")
          badges.push("<:EarlySupporter:1127566469895565345>");
        if (badge === "VerifiedBot")
          badges.push("<:VerifiedBot:1127566505907847210>");
      })
    );

    const userData = await fetch(
      `https://japi.rest/discord/v1/user/${user.id}`
    );
    const { data } = await userData.json();

    if (data.public_flags_array) {
      await Promise.all(
        data.public_flags_array.map(async (badge) => {
          if (badge === "NITRO") badges.push("<:Nitro:1127566490137264210>");
        })
      );
    }

    if (user.bot) {
      const botFetch = await fetch(
        `https://discord.com/api/v10/applications/${user.id}/rpc`
      );

      let json = await botFetch.json();
      let flagsBot = json.flags;

      const gateways = {
        APPLICATION_COMMAND_BADGE: 1 << 23,
      };

      const arrayFlags = [];

      for (let i in gateways) {
        const bit = gateways[i];
        if ((flagsBot & bit) === bit) arrayFlags.push(i);
      }

      if (arrayFlags.includes("APPLICATION_COMMAND_BADGE")) {
        badges.push("<:SlashCommands:1127566500992127056>");
      }
    }

    if (
      user.discriminator === `0` ||
      !user.discriminator ||
      user.tag === `${user.username}#0`
    ) {
      badges.push("<:Knownas:1127566484533694524>");
    }

    const em = new EmbedBuilder()
      .setColor(client.colour)
      .setTitle(`${user.username}'s badges`)
      .setDescription(`${badges.join(" | ") || "**No Badges Found**"} `);

    await interaction.editReply({
      embeds: [em],
    });
  },
};
