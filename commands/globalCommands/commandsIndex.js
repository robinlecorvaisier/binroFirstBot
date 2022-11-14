import {Collection} from "discord.js";

import {default as oTelefon} from './test.discord.js';
import {default as klassOuPaKlass} from './klassOrNotKlass.js';
import {default as reflexe} from './reflexes.js';

const globalCommands = new Collection();

globalCommands.set('oTelefon', oTelefon);
globalCommands.set('klassOuPaKlass', klassOuPaKlass);
globalCommands.set('reflexe', reflexe)


export default {globalCommands};

