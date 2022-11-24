import {
    AudioPlayerStatus,
    createAudioPlayer,
    createAudioResource,
    joinVoiceChannel,
    VoiceConnectionStatus
} from "@discordjs/voice";

let connection;
let player;

const voiceHelper = {
    init: function (interaction) {
        const member = interaction.member;
        connection = joinVoiceChannel({
            channelId: member.voice.channelId,
            guildId: interaction.guildId,
            adapterCreator: interaction.channel.guild.voiceAdapterCreator,
        });

        connection.on(VoiceConnectionStatus.Ready, (oldState, newState) => {
        });

        player = createAudioPlayer();
    },
    play: function (resourceUrl) {
        if (connection === undefined || player === undefined) {
            console.log('pls do init function');
            return false;
        }

        const resource = createAudioResource(resourceUrl);
        const subscribe = connection.subscribe(player);
        player.play(resource);

        player.on(AudioPlayerStatus.Idle, (oldState, newState) => {
            connection.destroy();
        });
    },
}

export {voiceHelper}