/**
 * Error handler for api routes
 */

// const Raven=require('raven');
const PrettyError=require('pretty-error');
const HTTPStatus=require('http-status');

// const constants=require('../config/constants');
const { APIError, RequiredError }=require('./error');

// const isProd = process.env.NODE_ENV === 'production';
const isDev = process.env.NODE_ENV === 'development';

// eslint-disable-next-line no-unused-vars
function logErrorService(err, req, res, next) {
  if (!err) {
    return new APIError(
      'Error with the server!',
      HTTPStatus.INTERNAL_SERVER_ERROR,
      true,
    );
  }

  // if (isProd) {
  //   const raven = new Raven.Client(constants.RAVEN_ID);
  //   raven.captureException(err);
  // }

  if (isDev) {
    const pe = new PrettyError();
    pe.skipNodeFiles();
    pe.skipPackage('express');

    // eslint-disable-next-line no-console
    console.log(pe.render(err));
  }

  const error = {
    message: err.message || 'Internal Server Error.',
  };

  if (err.errors) {
    error.errors = {};
    const { errors } = err;
    if (Array.isArray(errors)) {
      error.errors = RequiredError.makePretty(errors);
    } else {
      Object.keys(errors).forEach(key => {
        error.errors[key] = errors[key].message;
      });
    }
  }

  res.status(err.status || HTTPStatus.INTERNAL_SERVER_ERROR).json(error);

  return next();
}

module.exports = { logErrorService };