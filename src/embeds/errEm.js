const { EmbedBuilder } = require("discord.js");

const errEm = new EmbedBuilder()
  .setTitle(`Error <:Mod_Error:1127547846934155326>`)
  .setDescription(
    "**Something went wrong while executing the command / button**"
  )
  .setColor("Red");

module.exports = { errEm };
