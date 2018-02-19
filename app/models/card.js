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

    comments: {
        type: Array,
        default :[]
    },

    cost: {
        type: Number
    },

    dbfId: {
        type: String
    },

    flavor: {
        type: String
    },

    health: {
        type: Number
    },

    // For neutral cards, push the class of the deck. This is used to chart what classes are using what neutral cards the most.
    inclusionClass: {
        type: Array,
        default: [],
        required: true
    },

    inclusions: {
        type: Number,
        default: 0,
        required: true
    },

    inclusions: {
        Druid: {
            type: Number,
            default: 0,
            required: true
        },
        
        Hunter: {
            type: Number,
            default: 0,
            required: true
        },
        
        Mage: {
            type: Number,
            default: 0,
            required: true
        },
        
        Paladin: {
            type: Number,
            default: 0,
            required: true
        },
        
        Priest: {
            type: Number,
            default: 0,
            required: true
        },
        
        Rogue: {
            type: Number,
            default: 0,
            required: true
        },
        
        Shaman: {
            type: Number,
            default: 0,
            required: true
        },
        
        Warlock: {
            type: Number,
            default: 0,
            required: true
        },
        
        Warrior: {
            type: Number,
            default: 0,
            required: true
        },
        
        Neutral: {
            type: Number,
            default: 0,
            required: true
        },
        
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
    },

    upvotes: {
        type: Number,
        default: 0
    }, 

    upvoters: {
        type: Array
    },

    downvotes: {
        type: Number,
        default: 0
    },

    downvoters: {
        type: Array
    },

    lightForgeScore: {
        type: Array
    }

});

var Card = mongoose.model("Card", CardSchema);

module.exports = Card;