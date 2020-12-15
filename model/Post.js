const mongoose = require('mongoose');

// var dateFormat = require('dateformat');
// var now = Date.now();
// const currentDate = dateFormat(now, "dddd, mmmm dS, yyyy, h:MM:ss TT");

const PostSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    // cretor: {
    //     type: String,
    //     required: true,
    //     default: true
    // },
    date: {
        type: Date,
        default: Date.now()
    }
});


module.exports = mongoose.model('Posts', PostSchema);