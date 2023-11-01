const { Schema, model } = require('mongoose');

const EventSchema = Schema({
    title: {
        type: String,
    },
    desc: {
        type: String,
    },
    start: {
        type: String,
    },
    end: {
        type: String
    },
    allDay: {
        type: Boolean
    }
});


module.exports = model('Event',EventSchema );