const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    title: {
        type: String,
        unique: true,
        required: true
    }
});

module.exports = mongoose.model('Achievement', schema);