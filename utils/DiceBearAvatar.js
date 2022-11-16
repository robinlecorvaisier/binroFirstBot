const diceBearAvatar = {
    type: {
        adventurerNeutral: 'adventurer-neutral',
    },
    getAdventureNeutralAvatar: function (seed) {
        return getImageUrl(this.type.adventurerNeutral, seed, {})
    },
}


function getImageUrl(type, seed, options) {
    return `https://avatars.dicebear.com/api/${type}/${seed}.png`;
}

export default {diceBearAvatar}


