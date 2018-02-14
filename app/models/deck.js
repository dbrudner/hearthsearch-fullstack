var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var DeckSchema = new Schema({
    name: {
        type: String,
        required: true
    },

    hero: {
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

    curve: {
        type: Number
    },

    // Find all comments with this deckId and populate in an array
    comments: [{
        type: Schema.Types.ObjectId,
        ref: "Comment",
    }],

    user: {
        type: String
    }
});

var Deck = mongoose.model("Deck", DeckSchema);

module.exports = Deck;