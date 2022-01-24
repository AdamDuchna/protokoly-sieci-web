const { Schema, model } = require('mongoose');


const userSchema = new Schema({
    _id: {
        type: String,
        required: true 
    },
    login: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    registrationDate: Date,
    role: {
        type: String,
        required: true
    }

});

module.exports = model('User', userSchema);