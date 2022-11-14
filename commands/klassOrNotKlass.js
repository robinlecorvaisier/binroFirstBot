import {ActionRowBuilder, ButtonBuilder, SlashCommandBuilder} from "discord.js";
import {ButtonStyleTypes} from "discord-interactions";

export default {
    data: new SlashCommandBuilder()
        .setName('klass_ou_paklass')
        .setDescription('KLASS OU PAKLASS ?')
        .addStringOption(option =>
            option
                .setName('citation')
                .setDescription('cite ta question')
                .setRequired(true)
        ),
    execute: async function (interaction) {
        const commandUser = interaction.member;
        const quote = interaction.options.getString('citation');
        const buttonRow = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('klass')
                    .setLabel('KLASS')
                    .setStyle(ButtonStyleTypes.SUCCESS),
                new ButtonBuilder()
                    .setCustomId('paklass')
                    .setLabel('PAKLASS')
                    .setStyle(ButtonStyleTypes.DANGER),
            );

        await interaction.reply({
            content: `${commandUser} demande si ${quote} c'est :`,
            components: [buttonRow],
        });
    },
    buttonExecute: async function (interaction) {
        const member = interaction.member;
        switch (interaction.customId) {
            case 'klass':
                await interaction.reply(`${member} trouve que c'est KLASS 👍`);
                break;
            case 'paklass':
                await interaction.reply(`${member} trouve que c'est PAKLASS 👎`);
                break;
        }
    }
}



