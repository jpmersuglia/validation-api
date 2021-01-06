const mongoose = require('mongoose');

const ScrumSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    user: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Scrums', ScrumSchema);