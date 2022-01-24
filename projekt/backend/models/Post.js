const { Schema, model } = require('mongoose');

const postSchema = new Schema({
    _id: {
        type: String,
        required: true 
    },
    title:{
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    creationDate: Date,
    author: {type: String, ref: 'User'}

});

module.exports = model('Post', postSchema);