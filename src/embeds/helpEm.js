const { EmbedBuilder } = require("discord.js");

const modEm = new EmbedBuilder()
  .setTimestamp()
  .addFields(
    { name: "Ban", value: "`Ban the mentioned member.`" },
    { name: "Kick", value: "`Kick the mentioned member.`" },
    {
      name: "Timeout",
      value: "`Set or remove the timeout from the mentioned user.`",
    },
    {
      name: "lock",
      value: "`Lock the current text channel so that no one can type in it.`",
    },
    { name: "unlock", value: "`Allows everyone to type in the channel.`" },
    {
      name: "Purge",
      value: "`Purge / Delete the amount of messages given. [ MAX - 100 ]`",
    },
    {
      name: "Slowmode",
      value: "`Set / Remove the slowmode for the current channel`",
    },
    { name: "Role", value: "`Adds / Removes the given role from a member.`" }
  )
  .setTitle("Moderation Commands");

const comEm = new EmbedBuilder()
  .setTimestamp()
  .addFields(
    { name: "Badges", value: "`Shows all your badges.`" },
    { name: "whois", value: "`Gives some info on a member.`" }
  )
  .setTitle("Member / Community Commands");

const servEm = new EmbedBuilder()
  .setTimestamp()
  .addFields({ name: "serverinfo", value: "`Gives some info on the server.`" })
  .setTitle("Guild / Server Commands");

const utilEm = new EmbedBuilder()
  .setTimestamp()
  .addFields(
    { name: "botinfo", value: "`Gives some info on the bot.`" },
    { name: "embed\nSub Command - `embed create`", value: "`Create an embed`" },
    { name: "ping", value: "`Shows the latency / ping of the bot`" },
    { name: "help", value: "`Shows all the commands of the bot`" }
  )
  .setTitle("Utility Commands");

module.exports = { modEm, comEm, servEm, utilEm };
