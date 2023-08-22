require("dotenv").config();
const process = require("node:process");
const { token } = process.env;
const { Client, GatewayIntentBits } = require("discord.js");
const fs = require("fs");
const client = new Client({
  intents: Object.keys(GatewayIntentBits),
});
const { clientSet } = require("./set-client");
clientSet(client);
const functionFolders = fs.readdirSync(`./src/functions`);
for (const folder of functionFolders) {
  const functionFiles = fs
    .readdirSync(`./src/functions/${folder}`)
    .filter((file) => file.endsWith(".js"));
  for (const file of functionFiles)
    require(`./functions/${folder}/${file}`)(client);
}

client.handleEvents();
client.handleCommands();
client.handleComponents();
client.login(token);
