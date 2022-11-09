import {DiscordRequest} from "./utils.js";

export async function HasGuildCommands(appId, guildId, commands) {
    if (guildId === '' || appId === '') return;

    commands.forEach((c) => HasCommand(getGuildEndpoint(appId, guildId), c));
}

export async function HasGlobalCommands(appId, commands) {
    if (appId === '') return;

    commands.forEach((c) => HasCommand(getGlobalEndpoint(appId), c));
}

// Checks for a command
async function HasCommand(endpoint, command) {
    try {
        const res = await DiscordRequest(endpoint, {method: 'GET'});
        const data = await res.json();

        if (data) {
            const installedNames = data.map((c) => c['name']);
            // This is just matching on the name, so it's not good for updates
            if (!installedNames.includes(command['name'])) {
                console.log(`Installing "${command['name']}"`);
                InstallCommand(endpoint, command);
            } else {
                console.log(`"${command['name']}" command already installed`);
            }
        }
    } catch (err) {
        console.error(err);
    }
}

// Installs a command
async function InstallCommand(endpoint, command) {
    // install command
    try {
        await DiscordRequest(endpoint, {method: 'POST', body: command});
    } catch (err) {
        console.error(err);
    }
}

function getGlobalEndpoint(appId) {
    return `applications/${appId}/commands`;
}

function getGuildEndpoint(appId, guildId) {
    return `applications/${appId}/guilds/${guildId}/commands`;
}