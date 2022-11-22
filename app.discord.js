import {Client, Collection, Events, GatewayIntentBits} from "discord.js";
import config from "./config.json" assert {type: 'json'};
import globalCommands from './commands/globalCommands/commandsIndex.js';
import testGuildCommands from './commands/testGuildCommands/commandsIndex.js';
import commandsManagerDiscord from "./commandsApiManager.discord.js";
import commandsSetter from "./commandsManager.discord.js";
import numberUtils from "./utils/numberUtils.js";
import {generateDependencyReport} from "@discordjs/voice";


const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildVoiceStates,
    ]
});

console.log(generateDependencyReport())

// When the client is ready, run this code (only once)
// We use 'c' for the event parameter to keep it separate from the already defined 'client'
client.once(Events.ClientReady, c => {
    console.log(`Ready! Logged in as ${c.user.tag} : ${new Date()}`);
});

client.commands = new Collection();
commandsSetter.commandsClientSetter.setClientCommands(client);

client.on(Events.InteractionCreate, async interaction => {

    const banList = [
        // '395614947620683797', // moi
        // '188740003147415552', // jade
        // '737360899324772473', // menzo
        // '239490212776902657', // Fi
        '609877301831925760', // princesse
    ];

    const banMessages = [
        "niktamer toi",
        "manj tai mort",
        "va jouer avec un autre bot",
        "hmmm jmen fou, jle ferai pas",
        "va te fer metr plutot",
        "parle a mon cul",
        "atten tu as le droit de me parler ?",
        "Oh noooo, anyway",
        "kestu veu ke jtediz",
    ];


    if (banList.includes(interaction.member.user.id)) {

        const message = banMessages[numberUtils.getRandomInt(0, banMessages.length)];
        interaction.reply({content: message, ephemeral: true});
        return;
    }


    if (interaction.isButton()) {
        const commandName = interaction.message.interaction.commandName;
        const commandButton = interaction.client.commands.get(commandName);
        await commandButton.buttonExecute(interaction);
    }


    if (!interaction.isChatInputCommand()) return;

    const command = interaction.client.commands.get(interaction.commandName);

    if (!command) {
        console.error(`No command matching ${interaction.commandName} was found.`);
        return;
    }

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({content: 'There was an error while executing this command!', ephemeral: true});
    }
});

// commandsManagerDiscord.commandsManagerDiscord.allTestGuildCommandDelete();
// commandsManagerDiscord.commandsManagerDiscord.allGlobalCommandDelete();

commandsManagerDiscord.commandsManagerDiscord.testGuildCommandInstall(testGuildCommands.testGuildCommands);
commandsManagerDiscord.commandsManagerDiscord.globalCommandInstall(globalCommands.globalCommands);

// Log in to Discord with your client's token
client.login(config.token);