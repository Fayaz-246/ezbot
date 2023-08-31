const process = require("node:process");
const chalk = require("chalk");

module.exports = () => {
  process.on("unhandledRejection", async (reason, promise) => {
    console.log(
      chalk.red("Unhandled Rejection at:", promise, "reason:", reason)
    );
  });
  process.on("uncaughtException", async (error) => {
    console.log(chalk.red("Uncaught Exception at:", error));
  });
  process.on("uncaughtExceptionMonitor", (err, origin) => {
    console.log(chalk.red("Uncaught Exception Monitor:", err, origin));
  });
};
