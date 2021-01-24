const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Comments = new Schema({
    message: String
}, {timestamps: true})

const Reactions = new Schema({
    reaction: String
}, {timestamps: true})

const Favorites = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    favorite: Boolean
}, {timestamps: true})

const News = new Schema({
    newsData : {
        type: String,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    newsType: {
        type: String
    },
    comments: [Comments],
    reactions: [Reactions],
    favorites: [Favorites]

}, {timestamps: true});

module.exports = mongoose.model('News', News);