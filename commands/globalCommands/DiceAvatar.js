import {SlashCommandBuilder} from "discord.js";
import diceBearAvatar from "../../utils/DiceBearAvatar.js";

export default {
    data: new SlashCommandBuilder()
        .setName('avatar')
        .setDescription('génère un avatar')
        .addStringOption(option =>
            option
                .setName('seed')
                .setDescription('seed')
                .setRequired(true)
        )
    ,
    execute: async function (interaction) {
        const seed = interaction.options.get('seed').value;

        const avatarUrl = diceBearAvatar.diceBearAvatar.getAdventureNeutralAvatar(seed);
        await interaction.reply(avatarUrl);
        await interaction.channel.send(`C ${seed}`)
    },
    buttonExecute: async function (interaction) {
    },
}