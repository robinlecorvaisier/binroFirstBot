import {Collection} from "discord.js";

import {default as oTelefon} from './test.discord.js';
import {default as klassOuPaKlass} from './klassOrNotKlass.js';
import {default as reflexe} from './reflexes.js';
import {default as niOuiNiNon} from './NiOuiNiNon.js';
import {default as diceAvatar} from './DiceAvatar.js';
import {default as hogRider} from './HogRider.js';
import {default as voice} from './voice.js';

const globalCommands = new Collection();

globalCommands.set('oTelefon', oTelefon);
globalCommands.set('klassOuPaKlass', klassOuPaKlass);
globalCommands.set('reflexe', reflexe);
globalCommands.set('niOuiNiNon', niOuiNiNon);
globalCommands.set('diceAvatar', diceAvatar);
globalCommands.set('hogRider', hogRider);
globalCommands.set('voice', voice);

export default {globalCommands};

