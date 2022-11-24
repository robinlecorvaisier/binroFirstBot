import banMessagesJson from "./banMessages.json" assert {type: 'json'};
import numberUtils from "./numberUtils.js";

const theBanList = [];

const banUserManager = {
    addUserToTheBanList: function (discordUser, time) {
        if (!theBanList.includes(discordUser)) {
            theBanList.push(discordUser);
            setTimeout(this.freeUserFromTheBanList, time, discordUser);
            return true;
        }
        return false;
    },
    freeUserFromTheBanList: function (discordUser) {
        const index = theBanList.indexOf(discordUser);
        if (index > -1) {
            return theBanList.splice(index, 1);
        }
        return []
    },
    getTheBanList: function () {
        return theBanList;
    },
    isUserBan: function (discordUser) {
        return theBanList.includes(discordUser);
    },
    getBanMessage() {
        const banMessages = banMessagesJson.banMessages;
        return banMessages[numberUtils.getRandomInt(0, banMessages.length)];
    },
    isUserBanManager: function (discordUser) {
        const banManagers = banMessagesJson.banManagers;
        return banManagers.includes(discordUser.id);
    }
}

export default {banUserManager};