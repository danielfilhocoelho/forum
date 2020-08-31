const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    id: mongoose.Schema.ObjectId,
    title: {
        type: String,
        required: [true, 'Title missing']
    },
    userId: mongoose.Schema.Types.ObjectId,
    createdAt: {
        type: Date,
        default: Date.now
    },
    body: {
        type: String,
        required: [true, 'Body missing']
    },
    category: {
        type: String,
        required: [true, 'Category missing']
    },
    visits: {
        type: Number,
        default: 0
    },
    comments: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model('Post', postSchema);
