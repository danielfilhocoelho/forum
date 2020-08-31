const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    id: mongoose.Schema.ObjectId,
    title: {
        type: String,
        unique: true,
        required: [true, 'Missing title field']
    },
    description: {
        type: String,
        required: [true, 'Missing description field']
    },
    topics: {
        type: [mongoose.Schema.ObjectId]
    }
});

module.exports = mongoose.model('Category', CategorySchema);
