const express = require('express');
const routes = express.Router();
const UsersController = require('./controllers/UsersController');
const AuthController = require('./controllers/AuthController');
const PostsController = require('./controllers/PostsController');
const CategoriesController = require('./controllers/CategoriesController');
const CommentsController = require('./controllers/CommentsController');
const middlewares = require('./controllers/middlewares');

const usersController = new UsersController();
const authController = new AuthController();
const postsController = new PostsController();
const categoriesController = new CategoriesController();
const commentsController = new CommentsController();

// User routes
routes.get('/users', middlewares, usersController.index);
routes.get('/users/:registry', middlewares, usersController.show);
routes.post('/users', authController.create);
routes.post('/users/login', authController.authenticate);
routes.post('/users/logout', authController.logout);
routes.put('/users/:registry', usersController.update);
routes.delete('/users/:registry', middlewares, usersController.destroy);
routes.post('/users/forgotPassword', usersController.forgotPassword);
routes.patch('/users/resetPassword/:token', usersController.resetPassword);


// Post routes
routes.get('/posts', postsController.showAllPosts);
routes.get('/posts/:id', postsController.getPost);
routes.post('/posts', middlewares, postsController.createPost);
routes.put('/posts/:id', middlewares, postsController.updatePost);
routes.delete('/posts/:id', middlewares, postsController.deletePost);

// Category routes
routes.get('/categories', categoriesController.index);
routes.get('/categories/:title', categoriesController.show);
routes.post('/categories', categoriesController.create);

// Comment routes
routes.get('/comments', commentsController.showAllComments);
routes.post('/comments', middlewares, commentsController.createComment);
routes.delete('/comments/:id', middlewares, commentsController.deleteComment);

module.exports = routes;
