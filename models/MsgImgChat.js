const { Schema, model } = require('mongoose');

const MsgImgChatSchema = Schema({
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
    img: {
        type: String,
    }
});

MsgImgChatSchema.pre('save', function( next ) {
    this.created = new Date();
    next();
});

module.exports = model('MsgImgChat',MsgImgChatSchema );