const { readdirSync } = require("fs");

module.exports = (client) => {
  client.handleComponents = async () => {
    const componentFolders = readdirSync(`./src/components`);
    for (const folder of componentFolders) {
      const componentFiles = readdirSync(`src/components/${folder}`).filter(
        (f) => f.endsWith(".js")
      );

      const { buttons } = client;
      switch (folder) {
        case "buttons":
          for (const file of componentFiles) {
            const button = require(`../../components/${folder}/${file}`);
            if ("execute" in button && "data" in button && button.data.name) {
              buttons.set(button.data.name, button);
            }
          }
          break;

        default:
          break;
      }
    }
  };
};
