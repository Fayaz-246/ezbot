const fs = require("fs");

module.exports = (client) => {
  client.handleEvents = async () => {
    const eventFolders = fs.readdirSync(`./src/events`);
    for (const event of eventFolders) {
      const eventFiles = fs
        .readdirSync(`./src/events/${event}`)
        .filter((file) => file.endsWith(".js"));
      for (const file of eventFiles) {
        const eventE = require(`../../events/${event}/${file}`);
        if (eventE.once) {
          client.once(eventE.name, (...args) => eventE.execute(...args, client));
        } else {
          client.on(eventE.name, (...args) => eventE.execute(...args, client));
        }
      }
    }
  };
};

