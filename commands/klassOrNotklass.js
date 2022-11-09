import {ButtonStyleTypes, InteractionResponseType, InteractionType, MessageComponentTypes} from "discord-interactions";

const klassOrNotClass = {
    getCommand: function () {
        return {
            name: 'klass_or_notklass',
            description: 'KLASS OU PAKLASS ?',
            options: [
                {
                    type: 3,
                    name: 'citation',
                    description: 'cite ta question',
                    required: true,
                },
            ],
            type: 1,
        };
    },
    applicationCommand: function (req, res) {
        const {data} = req.body;

        if (data.name === this.getCommand().name) {

            const userId = req.body.member.user.id;
            console.log(data);

            return res.send({
                type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
                data: {
                    content: `<@${userId}> demande si ` + data.options[0].value + ` c'est : `,
                    components: [
                        {
                            type: MessageComponentTypes.ACTION_ROW,
                            components: [
                                {
                                    type: MessageComponentTypes.BUTTON,
                                    // Append the game ID to use later on
                                    custom_id: `klass_button_${req.body.id}`,
                                    label: 'KLASS',
                                    name: this.getCommand.name,
                                    style: ButtonStyleTypes.SUCCESS,
                                },
                                {
                                    type: MessageComponentTypes.BUTTON,
                                    // Append the game ID to use later on
                                    custom_id: `not_klass_button_${req.body.id}_2`,
                                    label: 'PAKLASS',
                                    name: this.getCommand.name,
                                    style: ButtonStyleTypes.DANGER,
                                },
                            ],
                        },
                    ],
                },
            });
        }
    },
    messageCommand: function (req, res){


    },
    klassResponse: function (){
        const userId = req.body.member.user.id;

        return res.send({
            type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
            data: {
                // Fetches a random emoji to send from a helper function
                content: `<@${userId}> trouve que c'est KLASS 👍`,
            },
        });
    },
    pasKlassResponse: function (){
        if (componentId.startsWith('not_klass_button_')) {
            const userId = req.body.member.user.id;

            return res.send({
                type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
                data: {
                    // Fetches a random emoji to send from a helper function
                    content: `<@${userId}> trouve que c'est PAKLASS 👎`,
                },
            });
        }
    }
}

export default {klassOrNotClass}