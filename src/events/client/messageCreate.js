const aiSchema = require("../../models/chatbot");
const axios = require("axios");

module.exports = {
  name: "messageCreate",
  async execute(message, client) {
    if (message.author.bot) return;
    if (
      message.content === `<@${client.id}>` ||
      message.content === "<@1126571121580445726>"
    ) {
      await message.author
        .send(
          "Heya! Im EzBot. I use slash commands if you wanna see all my current commands run </help:1126586161947758636>!"
        )
        .catch((e) => {});
      await message.react("✅");
      return;
    }
    const data = await aiSchema.findOne({
      Guild: message.guild.id,
    });
    if (data && data.Channel === message.channel.id) {
      await message.channel.sendTyping();
      let input = {
        method: "GET",
        url: "https://google-bard1.p.rapidapi.com/",
        headers: {
          text: message.content,
          "X-RapidAPI-Key":
            "454b8e539cmsh5fa0b025fa0d155p1102f3jsn570e16c1acc9",
          "X-RapidAPI-Host": "google-bard1.p.rapidapi.com",
        },
      };

      try {
        const output = await axios.request(input);
        const res = output.data.response;

        if (res.length > 2000) {
          const chunks = res.match(/.{1,2000}/g);

          for (let i = 0; i < chunks.length; i++) {
            await message.channel.send(chunks[i]).catch((er) => {
              message
                .reply(
                  "I am having a hard time finding that request, as I am an AI on discord. I dont have much time to process long requests"
                )
                .catch((err) => {});
            });
          }
        } else {
          message.channel.send(res).catch((er) => {
            message
              .reply(
                "I am having a hard time finding that request, as I am an AI on discord. I dont have much time to process long requests"
              )
              .catch((err) => {});
          });
        }
      } catch (e) {
        console.log(e);
        age
          .reply(
            "I am having a hard time finding that request, as I am an AI on discord. I dont have much time to process long requests"
          )
          .catch((err) => {});
      }
    }
  },
};
