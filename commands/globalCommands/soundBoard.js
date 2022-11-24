import {SlashCommandBuilder} from "discord.js";
import soundBoard from '../soundBoard.json' assert {type: 'json'};
import numberUtils from "../../utils/numberUtils.js";
import {voiceHelper} from "../../utils/voiceHelper.js";

export default {
    data: new SlashCommandBuilder()
        .setName('sound_board')
        .setDescription('play a sound')
        .addStringOption(option =>
            option
                .setName('sound')
                .setDescription('the sound')
                .setRequired(true)
                .addChoices(...getFormatChoices())
        )
    ,
    execute: async function (interaction) {
        await interaction.reply({
            content: "jariv",
            ephemeral: true,
        });

        const categoryChoose = interaction.options.getString('sound');
        const soundResourceUrl = getSound(categoryChoose);

        voiceHelper.init(interaction);
        voiceHelper.play(soundResourceUrl);

    },
    buttonExecute: async function (interaction) {
    },
}

function getFormatChoices() {
    const soundsCategories = soundBoard.categories;
    return soundsCategories.map(soundsCategory => {
        return {
            name: soundsCategory.toUpperCase(),
            value: soundsCategory.toLowerCase(),
        }
    });
}

function getSound(categoryChoose) {
    const soundsFromCategory = soundBoard.sounds[categoryChoose];
    return soundsFromCategory[numberUtils.getRandomInt(0, soundsFromCategory.length)];
}