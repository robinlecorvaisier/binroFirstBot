import {SlashCommandBuilder} from "discord.js";

export default {
    data: new SlashCommandBuilder()
        .setName('echo')
        .setDescription('je dis ce que tu veux')
        .addStringOption(option =>
            option
                .setName('text')
                .setDescription('ton texte')
                .setRequired(true)
        )
    ,
    execute: async function (interaction) {
        const message = interaction.options.getString('text');

        interaction.reply({content: 'ok', ephemeral: true});
        interaction.channel.send(message);
    },
    buttonExecute: async function (interaction) {
    },
}