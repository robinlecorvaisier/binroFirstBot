import {SlashCommandBuilder} from "discord.js";
import {
    AudioPlayerStatus,
    createAudioPlayer,
    createAudioResource,
    joinVoiceChannel,
    VoiceConnectionStatus
} from "@discordjs/voice";

export default {
    data: new SlashCommandBuilder()
        .setName('voice')
        .setDescription('fait du bruit')
    ,
    execute: async function (interaction) {

        interaction.reply({content: 'jariv', ephemeral: true});

        const member = interaction.member;

        const connection = joinVoiceChannel({
            channelId: member.voice.channelId,
            guildId: interaction.guildId,
            adapterCreator: interaction.channel.guild.voiceAdapterCreator,
        });

        connection.on(VoiceConnectionStatus.Ready, (oldState, newState) => {
            console.log('Connection is in the Ready state!');
        });
        const audioPlayer = createAudioPlayer();

        const resource = createAudioResource(`https://cdn.discordapp.com/attachments/916116126977638423/1042084184107257876/ferme_ta_gueule.mp3`);
        const subscribe = connection.subscribe(audioPlayer);
        audioPlayer.play(resource);

        audioPlayer.on(AudioPlayerStatus.Playing, (oldState, newState) => {
            console.log('Audio player is in the Playing state!');
        });


        setTimeout(() => {
            connection.destroy();
        }, 5000);
    },
    buttonExecute: async function (interaction) {
    },
}