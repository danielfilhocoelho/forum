const Post = require('../models/Post');
const Comment = require('../models/Comment');

class CommentsController {
    async createComment (request, response) {
        try {
            const newComment = await Comment.create({
                ...request.body,
                userId: request.userid
            });
            await Post.findByIdAndUpdate(request.body.postId, {
                $inc: {
                    comments: 1
                }
            });

            response.status(200).json({
                status: 'Success',
                data: {
                    comment: newComment
                }
            });
        } catch (err) {
            response.status(500).json({
                status: 'Fail',
                message: err
            });
        }
    }

    async updateComment (request, response) {
        try {
            const comment = await Comment.findByIdAndUpdate(request.params.id, request.body, {
                new: true,
                runValidators: true
            });
            response.status(200).json({
                status: 'Success',
                data: {
                    comment: comment
                }
            });
        } catch (err) {
            response.status(500).json({
                status: 'Fail',
                message: err
            });
        }
    }

    async showAllComments (request, response) {
        try {
            const comments = await Comment.find({});

            response.status(200).json(comments);
        } catch (err) {
            response.status(500).json({ message: err.message });
        }
    }

    async deleteComment (request, response) {
        try {
            await Comment.findByIdAndDelete(request.params.id);
            // TODO - Decrementar um comentário do post
            response.status(200).json({
                status: 'Success',
                data: null
            });
        } catch (err) {
            response.status(500).json({
                status: 'Fail',
                message: err
            });
        }
    }
}

module.exports = CommentsController;
