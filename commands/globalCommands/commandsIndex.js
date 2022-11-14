import {Collection} from "discord.js";

import {default as oTelefon} from './test.discord.js';
import {default as klassOuPaKlass} from './klassOrNotKlass.js';


const globalCommands = new Collection();

globalCommands.set('oTelefon', oTelefon);
globalCommands.set('klassOuPaKlass', klassOuPaKlass);


export default {globalCommands};

