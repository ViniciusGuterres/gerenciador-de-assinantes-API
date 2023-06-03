const mongoose = require('mongoose');

const subscribersSchema = new mongoose.Schema({
    code: {
        type: Number,
        require: true,
    },
    name: {
        type: String,
        require: true
    },
    birth_date: {
        type: String,
        require: true
    },
    telephone: {
        type: Number,
        require: true
    },
    address: {
        type: String,
        require: true
    },
    city: {
        type: String,
        require: true
    },
    state: {
        type: String,
        require: true
    },
    status: {
        type: String,
        require: true
    },
});

module.exports = mongoose.model('subscribers', subscribersSchema);