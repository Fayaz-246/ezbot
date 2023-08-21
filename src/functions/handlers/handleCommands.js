const fs = require("fs");
const chalk = require("chalk");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const ascii = require("ascii-table");
require("dotenv").config();
module.exports = (client) => {
  client.handleCommands = async () => {
    const { commands, commandArray } = client;
    const table = new ascii().setHeading("Command", "Status");
    const commandFolders = fs.readdirSync(`./src/commands`);
    for (const folder of commandFolders) {
      const commandFiles = fs
        .readdirSync(`./src/commands/${folder}`)
        .filter((file) => file.endsWith(".js"));

      for (const file of commandFiles) {
        //console.log(file)
        const command = require(`../../commands/${folder}/${file}`);
        if ("data" in command && "execute" in command) {
          commands.set(command.data.name, command);
          commandArray.push(command.data.toJSON());
          table.addRow(`${command.data.name}`, "✅");
        } else {
          table.addRow(`${file}`, "❌");
        }
      }
    }
    console.log(table.toString());
    const clientId = "1126571121580445726";
    const rest = new REST({ version: "9" }).setToken(process.env.token);

    (async () => {
      try {
        console.log(
          chalk.red(
            `Started refreshing ${commandArray.length} application (/) commands.`
          )
        );

        // The put method is used to fully refresh all commands in the guild with the current set
        await rest.put(Routes.applicationCommands(clientId), {
          body: commandArray,
        });

        console.log(
          chalk.green(
            `Successfully reloaded ${commandArray.length} application (/) commands.`
          )
        );
      } catch (error) {
        // And of course, make sure you catch and log any errors!
        console.error(error);
      }
    })();
  };
};
