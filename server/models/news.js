const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Comments = new Schema({
    message: String
}, {timestamps: true})

const Reactions = new Schema({
    reaction: String
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
    reactions: [Reactions]

}, {timestamps: true});

module.exports = mongoose.model('News', News);