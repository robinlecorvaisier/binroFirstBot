import {SlashCommandBuilder} from "discord.js";

export default {
    data: new SlashCommandBuilder()
        .setName('otelefon')
        .setDescription('ya til kelkun'),
    execute: async function (interation) {
        await interation.reply('ya person');
    },
}
