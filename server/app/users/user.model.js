const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    hash: {
        type: String,
        required: true
    },
    createdDate: {
        type: Date,
        default: Date.now
    },
    email: {
        type: String,
        required: true
    },
    picture: {
        type: String
    },
    score: {
        type: Number,
        required: true
    },
    likes: [{
        type: String
    }],
    achievements: [{
        type: String
    }],
    levelsCompleted: [{
        type: String
    }]
});

module.exports = mongoose.model('User', schema);