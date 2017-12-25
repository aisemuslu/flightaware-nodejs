/**
 * Post Routes
 */

const express = require('express');

const routes = express.Router();
const validate =require('express-validation');

const PostController=require('../controllers/post.controller');
const { authJwt } =require('../services/auth');



/**
 * CRUD
 */
routes.get('/', authJwt, PostController.getList);
routes.get('/:id', authJwt, PostController.getById);
routes.post(
  '/',
  authJwt,
  validate(PostController.validation.create),
  PostController.create,
);
routes.patch(
  '/:id',
  authJwt,
  validate(PostController.validation.update),
  PostController.updatePost,
);
routes.delete('/:id', authJwt, PostController.deletePost);

/**
 * Favorites
 */
routes.post('/:id/favorite', authJwt, PostController.favoritePost);

module.exports=routes;
