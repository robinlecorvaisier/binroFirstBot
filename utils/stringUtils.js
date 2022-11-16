export default {
    removeSpecialCharacters: function (string) {
        return string.replace(/[^a-zA-Z ]/g, "");
    }
}