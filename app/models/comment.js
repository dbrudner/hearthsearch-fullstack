var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var CommentSchema = new Schema({
    user: {
        type: String,
        required: true
    },

    comment: {
        type: String,
        required: true
    },

    deckId: {
        type: String,
        // required: true
    },

    date: {
        type: Date,
        required: true
    },

    upvotes: {
        type: Number,
        default: 0
    },

    upvoters: {
        type: Array
    }
});

var Comment = mongoose.model("Comments", CommentSchema);

module.exports = Comment;