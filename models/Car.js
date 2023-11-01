const { Schema, model } = require('mongoose');

const CarSchema = Schema({
    title: {
        type: String,
    },
    desc: {
        type: String,
    },
    img: {
        type: String
    }
});

CarSchema.pre('save', function( next ) {
    this.created = new Date();
    next();
});

module.exports = model('Car',CarSchema );