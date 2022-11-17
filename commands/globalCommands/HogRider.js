import {SlashCommandBuilder} from "discord.js";
import numberUtils from "../../utils/numberUtils.js";

const hogRiderCallGif = 'https://cdn.discordapp.com/attachments/1039486229349138522/1042797217859260486/clash-of-clans-hog-rider.gif';
const hogRiderRunningGif = 'https://cdn.discordapp.com/attachments/1039486229349138522/1042797217532096624/razorback-hog-pig-riding.gif';

export default {
    data: new SlashCommandBuilder()
        .setName('hog_rider')
        .setDescription('HOG RIIIDEER')
    ,
    execute: async function (interaction) {
        const user = interaction.member.user.username;
        console.log(`[HOG RIDER] ${user} : ${new Date()}`);

        await interaction.reply({content: 'in coming', ephemeral: true});


        const randomCallTime = numberUtils.getRandomInt(1, 5);
        setTimeout(() => {
            interaction.channel.send(hogRiderCallGif).then(() => {
                interaction.channel.send('HOG RIIIIDER');
                const randomRiderNumber = numberUtils.getRandomInt(2, 6);
                for (let i = 0; i < randomRiderNumber; i++) {
                    const randomRunTime = numberUtils.getRandomInt(3, 8);
                    setTimeout(() => {
                        interaction.channel.send(hogRiderRunningGif);
                    }, randomRunTime * 1000);
                }
            });
        }, randomCallTime * 1000);
    },
    buttonExecute: async function (interaction) {

    }
}