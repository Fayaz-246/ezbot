const { Collection } = require("discord.js");

const clientSet = async (client) => {
  client.commands = new Collection();
  client.buttons = new Collection();
  client.commandArray = [];
  client.colour = "#000000";
  client.cs = "#00ff6e";
  client.ce = "#fa2828";
  client.cache = new Map();
  client.success = "<:Mod_Check:1127547781054206113>";
  client.error = "<:Mod_Error:1127547846934155326>";
};

module.exports = { clientSet };
