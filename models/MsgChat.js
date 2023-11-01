const { Schema, model } = require('mongoose');

const MsgChatSchema = Schema({
    nickname: {
        type: String,
    },
    roomname: {
        type: String,
    },
    message: {
        type: String,
    },
    created: {
        type: Date
    },
});

MsgChatSchema.pre('save', function( next ) {
    this.created = new Date();
    next();
});

module.exports = model('MsgChat',MsgChatSchema );