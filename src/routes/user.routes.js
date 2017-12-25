/**
 * User Routes
 */

const express = require('express');

const routes = express.Router();
const validate =require('express-validation');

const UserController=require('../controllers/user.controller');
const AuthenticationController=require('../controllers/authentication.controller');
const { authLocal }=require('../services/auth');



routes.post(
  '/signup',
  validate(UserController.validation.create),
  UserController.create,
);
routes.post(
  '/login',
  validate(AuthenticationController.validation.login),
  authLocal,
  AuthenticationController.login,
);

module.exports= routes;
