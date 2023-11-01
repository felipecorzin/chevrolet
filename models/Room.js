const { Schema, model } = require('mongoose');

const RoomSchema = Schema({
    roomname: {
        type: String,
    },
    desc: {
        type: String,
    },
    created: {
        type: Date
    },
    img: {
        type: String
    }
});

RoomSchema.pre('save', function( next ) {
    this.created = new Date();
    next();
});

module.exports = model('Room',RoomSchema );