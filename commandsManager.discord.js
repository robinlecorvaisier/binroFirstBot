import globalCommands from './commands/globalCommands/commandsIndex.js';
import testGuildCommands from "./commands/testGuildCommands/commandsIndex.js";


const commandsClientSetter = {
    setClientCommands: function (client) {
        setCommands(client, globalCommands.globalCommands);
        setCommands(client, testGuildCommands.testGuildCommands);
    }
}

function setCommands(client, commands) {
    commands.forEach(function (command, key, map) {
        if ('data' in command && 'execute' in command) {
            client.commands.set(command.data.name, command);
        } else {
            console.log(`[WARNING] The command at ${key} is missing a required "data" or "execute" property.`);
        }
    });
}

export default {commandsClientSetter}