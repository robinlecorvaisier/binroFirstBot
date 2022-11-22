import {SlashCommandBuilder} from "discord.js";
import {
    AudioPlayerStatus,
    createAudioPlayer,
    createAudioResource, entersState,
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
        const subscription = connection.subscribe(audioPlayer);
        if (subscription) {
            // Unsubscribe after 5 seconds (stop playing audio on the voice connection)
            setTimeout(() => subscription.unsubscribe(), 5_000);
        }
        audioPlayer.play(resource);

        audioPlayer.on('error', error => {
            console.error(`Error: ${error.message} with resource ${error.resource.metadata.title}`);
        });

        try {
            await entersState(audioPlayer, AudioPlayerStatus.Playing, 5_000);
            // The player has entered the Playing state within 5 seconds
            console.log('Playback has started!');
        } catch (error) {
            // The player has not entered the Playing state and either:
            // 1) The 'error' event has been emitted and should be handled
            // 2) 5 seconds have passed
            console.error(error);
        }

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