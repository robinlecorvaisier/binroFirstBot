import {EmbedBuilder, SlashCommandBuilder} from "discord.js";

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
        ]

        const filter = function (message) {
            const messageContent = message.content.toLowerCase();
            const messageWords = messageContent.split(' ');
            const intersection = banWords.filter(x => messageWords.includes(x));
            return intersection.length !== 0;
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