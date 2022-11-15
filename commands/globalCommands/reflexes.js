import {SlashCommandBuilder} from "discord.js";
import reflexJson from "../reflexe.json" assert {type: 'json'};


function createChoises() {
    const reflexList = Object.values(reflexJson);
    return reflexList.map(function (reflex) {
        return {
            name: reflex.toUpperCase(),
            value: reflex,
        }
    })
}

const reflexChoices = createChoises().slice(0, 24);

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
        .addStringOption(option =>
            option
                .setName('reflex')
                .setDescription('choisis ton reflexe, vide pour random')
                .addChoices(...reflexChoices)
        )
    ,
    execute: async function (interaction) {
        const target = interaction.options.getUser('cible');
        let reflex = interaction.options.getString('reflex');

        if (reflex === undefined || reflex === null) {
            const randIndex = Math.floor(Math.random() * reflexChoices.length);
            reflex = reflexChoices[randIndex].value;
        }

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