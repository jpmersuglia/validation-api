const mongoose = require('mongoose');


const BlockerSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    creator: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        required: true,
        default: false
    },
    date: {
        type: Date,
        default: Date.now()
    }
});


module.exports = mongoose.model('Blocker', BlockerSchema);