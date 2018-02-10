var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var DeckSchema = new Schema({
    name: {
        type: String,
        required: true
    },

    archetype: {
        type: String,
        required: true
    },

    cards: {
        type: Array,
        required: true
    },

    cost: {
        type: Number,
        required: true
    },

    //   This field is for where the deck came from -- hearthhead, hearthypwn, hearthsearch, etc.
    source: {
        type: String,
    },

    description: {
        type: String
    },
    
    upvotes: {
        type: Number,
        default: 0
    },

    comments: {
        type: Array
    },

    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
});

var Deck = mongoose.model("Cards", DeckSchema);

module.exports = Deck;