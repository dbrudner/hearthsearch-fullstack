var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var CardSchema = new Schema({
    
    
    artist: {
        type: String
    },

    attack: {
        type: Number
    },

    cardId: {
        type: String
    },

    cardSet: {
        type: String
    },

    collectible: {
        type: Boolean
    },

    cost: {
        type: Number
    },

    dbfId: {
        type: Number
    },

    flavor: {
        type: String
    },

    health: {
        type: Number
    },

    img: {
        type: String
    },

    name: {
        type: String
    },

    playRequirements: {
        type: Array
    },

    playerClass: {
        type: String
    },

    rarity: {
        type: String
    },

    text: {
        type: String
    },

    type: {
        type: String
    }

});

var Card = mongoose.model("Card", CardSchema);

module.exports = Card;