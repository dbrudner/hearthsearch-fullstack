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

    //   This field is for where the deck came from -- hearthhead, hearthypwn, hearthsearch, etc.
    source: {
        type: String,
        required: true
    },

    description: {
        type: String
    },

  user:
    {
      type: Schema.Types.ObjectId,
      ref: "User"
    }
});

var Deck = mongoose.model("Cards", DeckSchema);

module.exports = Deck;