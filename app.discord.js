import {Client, Collection, Events, GatewayIntentBits} from "discord.js";
import config from "./config.json" assert {type: 'json'};
import globalCommands from './commands/globalCommands/commandsIndex.js';
import testGuildCommands from './commands/testGuildCommands/commandsIndex.js';
import commandsManagerDiscord from "./commandsApiManager.discord.js";
import commandsSetter from "./commandsManager.discord.js";
import {generateDependencyReport} from "@discordjs/voice";
import banUserManager from "./utils/banUserManager.js";


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

    const interactionUser = interaction.member.user;

    const banUserManagerInstance = banUserManager.banUserManager;
    // banUserManagerInstance.addUserToTheBanList(interactionUser, 5000);

    if (banUserManagerInstance.isUserBan(interactionUser)) {
        const message = banUserManager.banUserManager.getBanMessage();
        console.log(`${interactionUser.username} tried to ${interaction.commandName} at ${new Date()}`);
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