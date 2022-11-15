const diceBearAvatar = {
    type: {
        adventurerNeutral: 'adventurer-neutral',
    },
    getAdventureNeutralAvatar: function () {
        return getImageUrl(this.type.adventurerNeutral, Math.random().toString(), {})
    },
}


function getImageUrl(type, seed, options) {
    return `https://avatars.dicebear.com/api/${type}/${seed}.png`;
}

export default {diceBearAvatar}


