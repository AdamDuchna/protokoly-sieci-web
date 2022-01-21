const { Schema, model } = require('mongoose');

const commentSchema = new Schema({
    text: {
        type: String,
        required: true
    },
    creationDate: Date,
    post: {type: Schema.Types.ObjectId, ref: 'Post'},
    author: {type: Schema.Types.ObjectId, ref: 'User'}

});

module.exports = model('Comment', commentSchema);