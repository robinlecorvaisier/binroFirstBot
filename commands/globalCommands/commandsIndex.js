import {Collection} from "discord.js";

import {default as oTelefon} from './test.discord.js';
import {default as klassOuPaKlass} from './klassOrNotKlass.js';
import {default as reflexe} from './reflexes.js';
import {default as niOuiNiNon} from './NiOuiNiNon.js';
import {default as diceAvatar} from './DiceAvatar.js';

const globalCommands = new Collection();

globalCommands.set('oTelefon', oTelefon);
globalCommands.set('klassOuPaKlass', klassOuPaKlass);
globalCommands.set('reflexe', reflexe);
globalCommands.set('niOuiNiNon', niOuiNiNon);
globalCommands.set('diceAvatar', diceAvatar);

export default {globalCommands};

