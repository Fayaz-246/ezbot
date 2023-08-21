const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("embed")
    .setDescription("Create an embed!")
    .addSubcommand((sub) =>
      sub
        .setName("create")
        .setDescription("Create an embed")
        .addStringOption((opt) =>
          opt
            .setName("title")
            .setDescription("State the title for the embed")
            .setRequired(true)
        )
        .addStringOption((opt) =>
          opt
            .setName("description")
            .setDescription("State the desccription for the embed")
            .setRequired(true)
        )
        .addStringOption((opt) =>
          opt
            .setName("footer")
            .setDescription("State the footer for the embed")
            .setRequired(false)
        )
        .addStringOption((opt) =>
          opt
            .setName("image")
            .setDescription(
              "If you want to give an image for the embed. Imgur links are preferred"
            )
            .setRequired(false)
        )
        .addStringOption((opt) =>
          opt
            .setName("thumbnail")
            .setDescription(
              "If you want to give an thumbnail for the embed. Imgur links are preferred"
            )
            .setRequired(false)
        )
        .addStringOption((opt) =>
          opt
            .setName("colour")
            .setDescription(
              "State the colour for the embed. In hex code like #924F"
            )
            .setRequired(false)
        )
        .addBooleanOption((opt) =>
          opt
            .setName("timestamp")
            .setDescription(
              "State weather you want the embed to have a timestamp or not."
            )
            .setRequired(false)
        )
    ),
  async execute(interaction, client) {
    const { options } = interaction;

    const sC = options.getSubcommand();

    switch (sC) {
      case "create":
        const title = options.getString("title");
        const description = options.getString("description");
        const footer = options.getString("footer");
        const image = options.getString("image");
        const thumbnail = options.getString("thumbnail");
        const colour = options.getString("colour");
        const timestamp = options.getBoolean("timestamp") || false;

        const embed = new EmbedBuilder()
          .setTitle(`${title}`)
          .setDescription(`${description}`);
        if (footer) embed.setFooter({ text: `${footer}` });
        if (image) embed.setImage(image);
        if (thumbnail) embed.setThumbnail(thumbnail);
        if (colour) embed.setColor(colour);
        if (timestamp) embed.setTimestamp();

        await interaction.reply({
          embeds: [embed],
        });
        break;

      default:
        break;
    }
  },
};
