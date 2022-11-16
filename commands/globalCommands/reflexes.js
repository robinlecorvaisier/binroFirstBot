import {SlashCommandBuilder} from "discord.js";
import reflexJson from "../reflexe.json" assert {type: 'json'};


const reflexList = Object.values(reflexJson);


function pickRandomReflex(reflexList) {
    const random = Math.floor(Math.random() * reflexList.length);
    return reflexList[random];
}

export default {
    data: new SlashCommandBuilder()
        .setName('reflex')
        .setDescription('soit rapide !')
        .addUserOption(option =>
            option
                .setName('cible')
                .setDescription('celui qui devra repondre')
                .setRequired(true)
        )
    ,
    execute: async function (interaction) {
        const target = interaction.options.getUser('cible');
        const reflex = pickRandomReflex(reflexList);

        const filter = function (message) {
            const messageLower = message.content.toLowerCase();
            const response = reflexJson[reflex].toLowerCase();
            const scrible = message.member.user;
            return scrible.equals(target) && messageLower.includes(response);
        };

        await interaction.reply(`${target} ${reflex.toUpperCase()}`);

        const collector = interaction.channel.createMessageCollector({
            filter,
            time: 10000,
        });

        const endFunc = function (collected) {
            interaction.followUp(`${target} trop lent tokar`);
        };

        collector.on('collect', m => {
            interaction.followUp('OUEE MON POT');
            collector.off('end', endFunc);
            collector.stop();
        });

        collector.on('end', endFunc);
    },
    buttonExecute: async function (interaction) {
    },
}