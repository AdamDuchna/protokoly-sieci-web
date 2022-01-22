const { Schema, model } = require('mongoose');

const likesSchema = new Schema({
    count: {
        type: Number,
        required: true
    },
    post: {type: Schema.Types.ObjectId, ref: 'Post'},
    usersUpvotes: [Schema.Types.ObjectId],
    usersDownvotes: [Schema.Types.ObjectId],

});

module.exports = model('Likes', likesSchema);