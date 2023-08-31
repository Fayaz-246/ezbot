const express = require("express");
const app = express();
const { blue } = require("chalk");
const port = process.env.port;
const path = require("path");

module.exports = async (client) => {
  client.web = async () => {
    const serv = await client.guilds.cache.size;
    const usert = await client.users.cache.filter((user) => !user.bot).size;
    const channetlt = await client.channels.cache.size;
    app.set("view engine", "ejs");
    app.get("/", async (req, res) => {
      res.render("index", {
        client: client.user.username,
        servers: serv,
        users: usert,
        channels: channetlt,
      });
    });

    app.get("/styles/index", (req, res) => {
      res.sendFile(path.join(__dirname, "./css", "index.css"));
    });

    app.get("/commands", async (req, res) => {
      res.render("commands");
    });

    app.get("/styles/coloring", (req, res) => {
      res.sendFile(path.join(__dirname, "./css", "coloring.css"));
    });

    app.get("/styles/style", (req, res) => {
      res.sendFile(path.join(__dirname, "./css", "style.css"));
    });

    app.get("/styles/txtformatting", (req, res) => {
      res.sendFile(path.join(__dirname, "./css", "txtformatting.css"));
    });

    app.get("/styles/shadow", (req, res) => {
      res.sendFile(path.join(__dirname, "./css", "shadow.css"));
    });

    app.get("/styles/loading", (req, res) => {
      res.sendFile(path.join(__dirname, "./css", "loading.css"));
    });

    app.get("/styles/nav", (req, res) => {
      res.sendFile(path.join(__dirname, "./css", "nav.css"));
    });

    app.get("/styles/untitled", (req, res) => {
      res.sendFile(path.join(__dirname, "./css", "untitled.css"));
    });

    app.get("/styles/commands", (req, res) => {
      res.sendFile(path.join(__dirname, "./css", "commands.css"));
    });

    app.get("/styles/bootstrapmin", (req, res) => {
      res.sendFile(path.join(__dirname, "./css", "bootstrap.min.css"));
    });

    app.get("/js/script", async (req, res) => {
      res.sendFile(path.join(__dirname, "./js", "script.js"));
    });

    app.get("/js/bootstrap.bundle.min.js", async (req, res) => {
      res.sendFile(path.join(__dirname, "./js", "bootstrap.bundle.min.js"));
    });

    app.get("/js/addCommandfromClient", async (req, res) => {
      res.sendFile(path.join(__dirname, "./js/dist", "acfc.js"));
    });

    app.get("*", async (req, res) => {
      res.render("404");
    });

    app.listen(port, () => {
      console.log(
        `${blue(`[SERVER 🌏]`)} Now listening on port http://localhost:${port}`
      );
    });
  };
};
