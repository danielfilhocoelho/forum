const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    postId: mongoose.Schema.Types.ObjectId,
    userId: mongoose.Schema.Types.ObjectId,
    commentBody: String,
    created_at: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Comment', CommentSchema);
