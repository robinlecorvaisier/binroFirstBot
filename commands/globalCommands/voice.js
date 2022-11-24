import {SlashCommandBuilder} from "discord.js";
import {voiceHelper} from "../../utils/voiceHelper.js";

export default {
    data: new SlashCommandBuilder()
        .setName('voice')
        .setDescription('fait du bruit')
    ,
    execute: async function (interaction) {
        interaction.reply({content: 'jariv', ephemeral: true});
        voiceHelper.init(interaction);
        voiceHelper.play("https://cdn.discordapp.com/attachments/932614417252778014/932614456255578172/ct_vraiment_un_sale_moment.mp4");
    },
    buttonExecute: async function (interaction) {
    },
}