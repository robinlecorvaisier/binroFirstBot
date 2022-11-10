import {REST, Routes} from "discord.js";
import config from './config.json' assert {type: 'json'};


const appId = config.appId;
const rest = new REST({version: '10'}).setToken(config.token);

const commandsManagerDiscord = {
    guildCommandInstall: function (guildId, commands) {
        const route = Routes.applicationGuildCommands(appId, guildId);
        updateCommandsRequest(route, commands);
    },
    testGuildCommandInstall: function (commands) {
        this.guildCommandInstall(config.testGuildId, commands);
    },
    globalCommandInstall: function (commands) {
        const route = Routes.applicationCommands(appId);
        updateCommandsRequest(route, commands);
    },
    allGuildCommandDelete: function (guildId) {
        const route = Routes.applicationGuildCommands(appId, guildId);
        deleteAllCommandsRequest(route);
    },
    allTestGuildCommandDelete: function () {
        this.allGuildCommandDelete(config.testGuildId);
    },
    allGlobalCommandDelete: function () {
        const route = Routes.applicationCommands(appId);
        deleteAllCommandsRequest(route);
    },
}

function updateCommandsRequest(route, commands) {

    const jsonDataCommands = commands.map(command => commandDataFormatter(command));

    rest.put(route, {body: jsonDataCommands})
        .then(data => console.log(`${data.length} commands updated`))
        .catch(error => console.error(error));
}

function deleteAllCommandsRequest(route) {
    rest.put(route, {body: []})
        .then(data => console.log(`all commands deleted`))
        .catch(error => console.error(error));
}


function commandDataFormatter(command) {
    return command.data.toJSON();
}

export default {commandsManagerDiscord};