const chalk = require("chalk");
const { ActivityType } = require("discord.js");

module.exports = {
  name: "ready",
  once: true,
  async execute(client) {
    console.log;
    client.user.setPresence({
      activities: [
        {
          name: `to ${client.commandArray.length} commands || /help`,
          type: ActivityType.Listening,
        },
      ],
      status: "online",
    });
    console.log(
      chalk.blue(
        `Bot has logged in with the client username ${client.user.tag}!!`
      )
    );
  },
};
