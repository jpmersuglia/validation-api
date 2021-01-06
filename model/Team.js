const mongoose = require('mongoose');

const TeamSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    // owner: {
    //     type: String,
    //     required: false
    // },
    date: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Teams', TeamSchema);