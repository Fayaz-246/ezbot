const fs = require("fs");
let array = [];

const commandFolders = fs.readdirSync(`./src/commands`);
for (const folder of commandFolders) {
  const commandFiles = fs
    .readdirSync(`./src/commands/${folder}`)
    .filter((file) => file.endsWith(".js"));

  for (const file of commandFiles) {
    const command = require(`../../commands/${folder}/${file}`);
    if ("data" in command && "execute" in command) {
      array.push({
        name: `${command.data.name}`,
        description: `${command.data.description}`,
      });
    } else {
      console.log(`No command data`);
    }
  }
}

module.exports = array;
