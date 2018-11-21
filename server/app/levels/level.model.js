const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    title: {
        type: String,
        unique: true,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    statement: {
        type: String,
        required: true
    },
    inputs: {
        type: String,
        required: true
    },
    outputs: {
        type: String,
        required: true
    },
    solution: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Level', schema);