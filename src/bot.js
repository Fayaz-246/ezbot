require("dotenv").config();
const process = require("node:process");
const { token } = process.env;
const {
  Client,
  Collection,
  EmbedBuilder,
  GatewayIntentBits,
} = require("discord.js");
const fs = require("fs");
const client = new Client({
  intents: Object.keys(GatewayIntentBits),
});
client.commands = new Collection();
client.buttons = new Collection();
client.commandArray = [];
client.colour = "#000000";
client.cs = "#00ff6e";
client.ce = "#fa2828";
client.cache = new Map();
client.success = "<:Mod_Check:1127547781054206113>";
client.error = "<:Mod_Error:1127547846934155326>";

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
