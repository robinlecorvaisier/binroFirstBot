import {Client, Collection, Events, GatewayIntentBits} from "discord.js";
import config from "./config.json" assert {type: 'json'};
import * as commands from './commands/commandsIndex.js'
import commandsManagerDiscord from "./commandsManager.discord.js";

const client = new Client({intents: [GatewayIntentBits.Guilds]});

// When the client is ready, run this code (only once)
// We use 'c' for the event parameter to keep it separate from the already defined 'client'
client.once(Events.ClientReady, c => {
    console.log(`Ready! Logged in as ${c.user.tag}`);
});

client.commands = new Collection();

const commandList = Object.entries(commands);

commandList.forEach(function ([key, command]) {

    if ('data' in command && 'execute' in command) {
        client.commands.set(command.data.name, command);
    } else {
        console.log(`[WARNING] The command at ${key} is missing a required "data" or "execute" property.`);
    }

});

client.on(Events.InteractionCreate, async interaction => {
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

commandsManagerDiscord.commandsManagerDiscord.testGuildCommandInstall(client.commands);
commandsManagerDiscord.commandsManagerDiscord.globalCommandInstall(client.commands);

// Log in to Discord with your client's token
client.login(config.token);