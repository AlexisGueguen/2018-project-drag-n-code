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
    },
    badge: {
        type: String
    }
});

module.exports = mongoose.model('Achievement', schema);