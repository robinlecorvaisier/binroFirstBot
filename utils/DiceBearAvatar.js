import stringUtils from "./stringUtils.js";

const diceBearAvatar = {
    type: {
        adventurerNeutral: 'adventurer-neutral',
    },
    getAdventureNeutralAvatar: function (seed) {

        seed = seed.split(' ').join('');
        seed = stringUtils.removeSpecialCharacters(seed);

        return getImageUrl(this.type.adventurerNeutral, seed, {})
    },
}


function getImageUrl(type, seed, options) {
    return `https://avatars.dicebear.com/api/${type}/${seed}.png`;
}

export default {diceBearAvatar}
