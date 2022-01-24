const { Schema, model } = require('mongoose');

const commentSchema = new Schema({
    _id: {
        type: String,
        required: true 
    },
    text: {
        type: String,
        required: true
    },
    creationDate: Date,
    post: {type: String, ref: 'Post'},
    author: {type: String, ref: 'User'}

});

module.exports = model('Comment', commentSchema);