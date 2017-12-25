/**
 * Authentication controller
 */

const HTTPStatus=require('http-status');
const Joi=require('joi');

const validation = {
  login: {
    body: {
      email: Joi.string().email().required(),
      password: Joi.string().required()
      // password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
    },
  },
};

/**
 * @api {post} /users/login Login a user
 * @apiDescription Login a user
 * @apiName loginUser
 * @apiGroup User
 *
 * @apiParam {String}  email User email (body).
 * @apiParam {String}  password User password (body).
 *
 * @apiSuccess {Number} status Status of the Request.
 * @apiSuccess {String} _id User _id.
 * @apiSuccess {String} token Authentication token.
 *
 * @apiSuccessExample Success-Response:
 *
 * HTTP/1.1 200 OK
 *
 * {
 *  _id: '123',
 *  token: 'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1OTBhMWI3ODAzMDI3N2NiNjQxM2JhZGUiLCJpYXQiOjE0OTM4MzQ2MTZ9.RSlMF6RRwAALZQRdfKrOZWnuHBk-mQNnRcCLJsc8zio',
 * }
 *
 * @apiErrorExample {json} Error
 *  HTTP/1.1 400 Bad Request
 *
 *  {
 *    email: 'email is required'
 *  }
 */
async function login(req, res, next) {
  res.status(HTTPStatus.OK).json(req.user.toAuthJSON());

  // return next();
}


module.exports= {validation, login};