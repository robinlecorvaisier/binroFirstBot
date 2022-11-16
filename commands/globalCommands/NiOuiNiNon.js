import {EmbedBuilder, SlashCommandBuilder} from "discord.js";
import stringUtils from "../../utils/stringUtils.js";

export default {
    data: new SlashCommandBuilder()
        .setName('ni_oui_ni_non')
        .setDescription(`tu sais ce que c'est`)
        .addNumberOption(option =>
            option
                .setName('time')
                .setDescription('le temps de jeu en minutes')
                .setMaxValue(120)
                .setMinValue(3)
                .setRequired(true)
        ),
    execute: async function (interaction) {

        const time = interaction.options.get('time').value;
        const author = interaction.member.user;
        const description = `Je propose une relance sérieuse du ni oui ni non où le perdant sa mère c'est une pute`;

        await interaction.reply({embeds: [createEmbed(description, time, author)]});

        const banWords = [
            'oui',
            'ui',
            'ouais',
            'oue',
            'ouai',
            'non',
            'nn',
            'nan',
        ];

        const regexMatch = banWords.map(function (banWord) {
            return formatRegexBanWord(banWord);
        })

        const filter = function (message) {
            let messageContent = message.content.toLowerCase();
            messageContent = stringUtils.removeSpecialCharacters(messageContent);

            for (const regex of regexMatch) {
                const matches = regex.exec(messageContent);
                console.log(matches);
                console.log(regex);
                // if (matches !== null) {
                //     return true;
                // }
            }
            return false;
        }


        const milliseconds = time * 60000;
        const collector = interaction.channel.createMessageCollector({
            filter,
            time: milliseconds,
        });


        const endFunc = function (collected) {
            interaction.followUp(`La partie est fini vous êtes fort`);
        };


        collector.on('collect', m => {
            interaction.followUp(`ALLEE C TA DARONE ${m.member}`);
            collector.off('end', endFunc);
            collector.stop();
        });

        collector.on('end', endFunc);
    }
    ,
    buttonExecute: async function (interaction) {
    }
    ,
}


function createEmbed(message, time, author) {
    return new EmbedBuilder()
        .setColor(0x0099FF)
        .setTitle(`NI OUI NI NON`)
        .setDescription(`${message}`)
        .setThumbnail('https://cdn.discordapp.com/attachments/1039486229349138522/1042058035981463642/unknown.png')
        .setImage('https://cdn.discordapp.com/attachments/1039486229349138522/1042031617763463268/relance_ni_oui_ni_non.png')
        .addFields(
            {name: `Faite gaffe pour une durée de`, value: `${time} minutes`},
        )
        .setFooter({text: `${author.username} - bonne game à tous`, iconURL: author.avatarURL()})
}

function formatRegexBanWord(banWord) {
    let chars = banWord.split('');
    chars = chars.map(c => `${c}+`);
    const charsJoin = chars.join("\\" + "s*");
    const regex = `${charsJoin}`;
    return new RegExp(regex, 'g');
}