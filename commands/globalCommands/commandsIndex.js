import {Collection} from "discord.js";

import {default as oTelefon} from './test.discord.js';
import {default as klassOuPaKlass} from './klassOrNotKlass.js';
import {default as reflexe} from './reflexes.js';
import {default as niOuiNiNon} from './NiOuiNiNon.js';
import {default as diceAvatar} from './DiceAvatar.js';
import {default as hogRider} from './HogRider.js';
import {default as voice} from './voice.js';
import {default as echo} from './echo.js';
import {banUser, unbanUser, banList} from './banUserManager.js';
import {default as soundBoard} from './soundBoard.js';

const globalCommands = new Collection();

globalCommands.set('oTelefon', oTelefon);
globalCommands.set('klassOuPaKlass', klassOuPaKlass);
globalCommands.set('reflexe', reflexe);
globalCommands.set('niOuiNiNon', niOuiNiNon);
globalCommands.set('diceAvatar', diceAvatar);
globalCommands.set('hogRider', hogRider);
// globalCommands.set('voice', voice);
globalCommands.set('echo', echo);
globalCommands.set('banUser', banUser);
globalCommands.set('unbanUser', unbanUser);
globalCommands.set('banList', banList);
globalCommands.set('soundBoard', soundBoard);

export default {globalCommands};

