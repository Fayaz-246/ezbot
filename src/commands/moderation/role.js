const {
  SlashCommandBuilder,
  EmbedBuilder,
  PermissionFlagsBits,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  ComponentType,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("role")
    .setDescription("Add / Remove the role of a member")
    .addSubcommand((sub) =>
      sub
        .setName("add")
        .setDescription("Add the role to a member")
        .addUserOption((opt) =>
          opt
            .setName("user")
            .setDescription("The member you want to add the role to.")
            .setRequired(true)
        )
        .addRoleOption((opt) =>
          opt
            .setName("role")
            .setDescription("The role you want to add to the member.")
            .setRequired(true)
        )
    )
    .addSubcommand((sub) =>
      sub
        .setName("remove")
        .setDescription("Remove a role from the member")
        .addUserOption((opt) =>
          opt
            .setName("user")
            .setDescription("The member you want to remove the role from.")
            .setRequired(true)
        )
        .addRoleOption((opt) =>
          opt
            .setName("role")
            .setDescription("The role you want to remove from the member.")
            .setRequired(true)
        )
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles),
  async execute(interaction, client) {
    const { options } = interaction;
    const { ce, cs, success, error } = client;
    if (options.getSubcommand(true) === "add") {
      let done = false;
      const member = options.getMember("user");
      const target = options.getUser("user");
      const role = options.getRole("role");
      const btnSuccess = new ButtonBuilder()
        .setCustomId("roleAdd")
        .setEmoji(client.success)
        .setStyle(ButtonStyle.Success);
      const btnError = new ButtonBuilder()
        .setCustomId("roleCancel")
        .setEmoji(client.error)
        .setStyle(ButtonStyle.Danger);
      const ButtonRow = new ActionRowBuilder().addComponents(
        btnSuccess,
        btnError
      );
      const em = new EmbedBuilder()
        .setColor(client.colour)
        .setDescription(
          `Are you sure you want to add the role ${role} to <@${target.id}> [ ${target.username} ].`
        );
      interaction.reply({
        embeds: [em],
        components: [ButtonRow],
      });
      const filter = (i) => i.user.id === interaction.user.id;
      const collector = interaction.channel.createMessageComponentCollector({
        componentType: ComponentType.Button,
        filter,
        time: 10_000,
      });
      const embed = new EmbedBuilder()
        .setColor(ce)
        .setDescription("**Prompt Cancelled [ Timeout ]**");
      collector.on("collect", async (btn) => {
        if (btn.customId === "roleAdd") {
          const em = new EmbedBuilder()
            .setColor(cs)
            .setTimestamp()
            .setDescription(
              `**Successfully added ${role} to <@${target.id}> ${success}**`
            );

          try {
            member.roles.add(role);
            await interaction.editReply({
              embeds: [em],
              components: [],
            });
            done = true;
          } catch (err) {
            interaction.editReply({
              content:
                "There was an error, please check my permissions. [ I cannot add roles higher than me ]",
            });
          }
        }
      });
      collector.on("end", async (btn) => {
        if (done === false)
          return interaction.editReply({ embeds: [embed], components: [] });
        else return;
      });
    } else if (options.getSubcommand(true) === "remove") {
      let done = false;
      const member = options.getMember("user");
      const target = options.getUser("user");
      const role = options.getRole("role");
      const btnSuccess = new ButtonBuilder()
        .setCustomId("roleRemove")
        .setEmoji(client.success)
        .setStyle(ButtonStyle.Success);
      const btnError = new ButtonBuilder()
        .setCustomId("roleCancel")
        .setEmoji(client.error)
        .setStyle(ButtonStyle.Danger);
      const ButtonRow = new ActionRowBuilder().addComponents(
        btnSuccess,
        btnError
      );
      const em = new EmbedBuilder()
        .setColor(client.colour)
        .setDescription(
          `Are you sure you want to remove the role ${role} from <@${target.id}> [ ${target.username} ].`
        );

      interaction.reply({
        embeds: [em],
        components: [ButtonRow],
      });
      const filter = (i) => i.user.id === interaction.user.id;
      const collector = interaction.channel.createMessageComponentCollector({
        componentType: ComponentType.Button,
        filter,
        time: 10_000,
      });
      const embed = new EmbedBuilder()
        .setColor(ce)
        .setDescription("**Prompt Cancelled [ Timeout ]**");
      collector.on("collect", async (btn) => {
        if (btn.customId === "roleRemove") {
          const em = new EmbedBuilder()
            .setColor(cs)
            .setTimestamp()
            .setDescription(
              `**Successfully removed ${role} from <@${target.id}> ${success}**`
            );

          try {
            member.roles.remove(role);
            await interaction.editReply({
              embeds: [em],
              components: [],
            });
            done = true;
          } catch {
            interaction.editReply({
              content:
                "There was an error, please check my permissions. [ I cannot remove roles higher than me ]",
            });
          }
        }
      });

      collector.on("end", async (btn) => {
        if (done === false)
          return interaction.editReply({ embeds: [embed], components: [] });
        else return;
      });
    }
  },
};
