require("dotenv").config;
const { mongoURI } = process.env;
module.exports = (client) => {
  const mongo = require("mongoose");
  mongo.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const { green, blue, red } = require("chalk");

  mongo.connection.on("connected", () => {
    console.log(green("[Mongo 🍃]"), "Connected to DB!");
  });

  mongo.connection.on("disconnected", () => {
    console.log(blue("[Mongo 🍃]"), "Disconnected from DB.");
  });

  mongo.connection.on("err", (err) => {
    console.log(red("[Mongo 🍃]"), `DB Err:\n${err}`);
  });
};
