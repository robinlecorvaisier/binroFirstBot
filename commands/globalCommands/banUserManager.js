import {EmbedBuilder, SlashCommandBuilder} from "discord.js";
import banUserManager from "../../utils/banUserManager.js";

const banUser = {
    data: new SlashCommandBuilder()
        .setName('ban_user')
        .setDescription('niksamer tu peu plu use mon bot toi')
        .addUserOption(option =>
            option
                .setName('user')
                .setDescription('user to ban')
                .setRequired(true)
        )
        .addNumberOption(option =>
            option
                .setName('duration')
                .setDescription('durant combien de temps (seconde)')
                .setRequired(true)
                .setMinValue(1)
        )
    ,
    execute: async function (interaction) {
        const userInteraction = interaction.member.user;
        if (!banUserManager.banUserManager.isUserBanManager(userInteraction)) {
            await interaction.reply({
                content: 't ki pour fair sa ?',
                ephemeral: true
            });
            return;
        }

        const user = interaction.options.getUser('user');
        const duration = interaction.options.getNumber('duration');

        if (banUserManager.banUserManager.addUserToTheBanList(user, duration * 1000)) {
            await interaction.reply({
                content: `${user} est ban ${duration} secondes`,
                ephemeral: true,
            });
            return;
        }
        await interaction.reply({
            content: `${user} est déjà ban en fait ez`,
            ephemeral: true,
        });
    },
    buttonExecute: async function (interaction) {
    },
}

const unbanUser = {
    data: new SlashCommandBuilder()
        .setName('unban_user')
        .setDescription('asy reparle moi')
        .addUserOption(option =>
            option
                .setName('user')
                .setDescription('user to unban')
                .setRequired(true)
        )
    ,
    execute: async function (interaction) {
        const userInteraction = interaction.member.user;
        if (!banUserManager.banUserManager.isUserBanManager(userInteraction)) {
            await interaction.reply({
                content: 't ki pour fair sa ?',
                ephemeral: true
            });
            return;
        }
        const user = interaction.options.getUser('user');

        const res = banUserManager.banUserManager.freeUserFromTheBanList(user);
        if (res.length > 0) {
            await interaction.reply({
                content: `${user} est libre`,
                ephemeral: true,
            });
            return;
        }
        await interaction.reply({
            content: `personne n'a été libéré`,
            ephemeral: true,
        });
    },
    buttonExecute: async function (interaction) {
    },
}

const banList = {
    data: new SlashCommandBuilder()
        .setName('ban_list')
        .setDescription('liste les fdp')
    ,
    execute: async function (interaction) {
        const banList = banUserManager.banUserManager.getTheBanList();
        const embed = createEmbedBanList(banList);
        await interaction.reply({embeds: [embed]});
    },
    buttonExecute: async function (interaction) {
    },
}

function createEmbedBanList(banList) {
    return new EmbedBuilder()
        .setColor(0x0099FF)
        .setTitle(`THE BAN LIST`)
        .setDescription(`la fameuse liste de tous les FDP`)
        .addFields({name: `les FDP :`, value: formatTheBanList(banList)});
}

function formatTheBanList(banList) {
    if (banList.length > 0) {
        return banList.map(discordUser => discordUser.username).join(', ');
    }
    return `Et bien... il n'existe donc pas de FDP ?`;
}

export {banUser, unbanUser, banList};