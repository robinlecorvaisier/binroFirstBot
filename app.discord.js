import {Client, Collection, Events, GatewayIntentBits} from "discord.js";
import config from "./config.json" assert {type: 'json'};
import globalCommands from './commands/globalCommands/commandsIndex.js';
import testGuildCommands from './commands/testGuildCommands/commandsIndex.js';
import commandsManagerDiscord from "./commandsApiManager.discord.js";
import commandsSetter from "./commandsManager.discord.js";
import {generateDependencyReport} from "@discordjs/voice";
import banUserManager from "./utils/banUserManager.js";
import {loggerService} from "./services/loggers/LoggerService.js";
import {loggerConsole} from "./services/loggers/loggerConsole.js";

loggerService.create(loggerConsole);

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildVoiceStates,
    ]
});

// console.log(generateDependencyReport())

// When the client is ready, run this code (only once)
// We use 'c' for the event parameter to keep it separate from the already defined 'client'
client.once(Events.ClientReady, c => {
    loggerService.logInfo(`Ready! Logged in as ${c.user.tag}`);
});

client.commands = new Collection();
commandsSetter.commandsClientSetter.setClientCommands(client);


client.on(Events.InteractionCreate, async interaction => {

    const interactionUser = interaction.member.user;

    loggerService.logInfo(`${interactionUser.username} use ${interaction.commandName}`);
    const banUserManagerInstance = banUserManager.banUserManager;
    // banUserManagerInstance.addUserToTheBanList(interactionUser, 5000);

    if (banUserManagerInstance.isUserBan(interactionUser)) {
        const message = banUserManager.banUserManager.getBanMessage();
        loggerService.logInfo(`Ban user ${interactionUser.username} tried to ${interaction.commandName}`);
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
        loggerService.logWarning(`${interactionUser.username} tried to use ${interaction.commandName} that doesnt exist`);
        console.error(`No command matching ${interaction.commandName} was found.`);
        return;
    }

    try {
        await command.execute(interaction);
    } catch (error) {
        loggerService.logError(`${interactionUser.username} used ${interaction.commandName} and proc an error`);
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