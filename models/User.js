const { Schema, model } = require('mongoose');

const UserSchema = Schema({
    name: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        default: 'assets/img/avatar.png'
    },
    city: {
        type: String,
    },
    created: {
        type: Date
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
    },
    lat: {
        type: Number,
    },
    lng: {
        type: Number,
    },
    age: {
        type: Number,
    },
    uso: {
        type: Number,
    },
    active: {
        type: Boolean
    }
});


UserSchema.pre('save', function( next ) {
    this.created = new Date();
    next();
});

module.exports = model('User', UserSchema );