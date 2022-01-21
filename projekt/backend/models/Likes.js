const { Schema, model } = require('mongoose');

const likesSchema = new Schema({
    count: {
        type: Number,
        required: true
    },
    post: {type: Schema.Types.ObjectId, ref: 'Post'},
    users: [Schema.Types.ObjectId]

});

module.exports = model('Likes', likesSchema);