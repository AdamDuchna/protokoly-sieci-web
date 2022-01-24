const { Schema, model } = require('mongoose');

const likesSchema = new Schema({
    _id: {
        type: String,
        required: true 
    },
    count: {
        type: Number,
        required: true
    },
    post: {type: String, ref: 'Post'},
    usersUpvotes: [String],
    usersDownvotes: [String],

});

module.exports = model('Likes', likesSchema);