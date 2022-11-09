import {getRPSChoices} from './game.js';
import {capitalize} from './utils.js';

// Get the game choices from game.js
function createCommandChoices() {
    const choices = getRPSChoices();
    const commandChoices = [];

    for (let choice of choices) {
        commandChoices.push({
            name: capitalize(choice),
            value: choice.toLowerCase(),
        });
    }

    return commandChoices;
}

// Simple test command
export const TEST_COMMAND = {
    name: 'test',
    description: 'Basic guild command',
    type: 1,
};

// Command containing options
export const CHALLENGE_COMMAND = {
    name: 'challenge',
    description: 'Challenge to a match of rock paper scissors',
    options: [
        {
            type: 3,
            name: 'object',
            description: 'Pick your object',
            required: true,
            choices: createCommandChoices(),
        },
    ],
    type: 1,
};

export const TEST_2_COMMAND = {
    name: 'test2',
    description: 'test 2',
    type: 1,
};

export const KLASS_OR_NOTKLASS = {
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
