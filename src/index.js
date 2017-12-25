const express = require('express');
const httpStatus = require('http-status');
const expressValidation = require('express-validation');

const constants = require('./config/constants');
require('./config/database');
const middlewares = require('./config/middlewares');
const APIError = require('./services/error');
// const ApiRoutes = require('./routes');
const HTTPStatus = require('http-status');
const UserRoutes =require('./routes/user.routes');
const PostRoutes =require('./routes/post.routes');
const FlightRoutes =require('./routes/flight.routes');


const app = express();


middlewares(app);

app.use('/flight', FlightRoutes);

app.use('/users', UserRoutes);
app.use('/posts', PostRoutes);

// catch 404 and forward to error handler
app.use((req, res, next) =>
  next(new APIError('Not Found!', HTTPStatus.NOT_FOUND, true)),
);



const isTest = process.env.NODE_ENV === 'test';
const isDev = process.env.NODE_ENV === 'development';

// if error is not an instanceOf APIError, convert it.
app.use((err, req, res, next) => {
  if (err instanceof expressValidation.ValidationError) {
    // validation error contains errors which is an array of error each containing message[]
    const unifiedErrorMessage = err.errors.map(error => error.messages.join('. ')).join(' and ');
    return res.status(err.status).json({
      error: unifiedErrorMessage,
      stack: isDev ? err.stack : {}
    });
  } else if (!(err instanceof APIError)) {
    return res.status(err.status || httpStatus.INTERNAL_SERVER_ERROR).json({
      error: err.message,
      stack: isDev ? err.stack : {}
    });
  }
  return next(err);
});


// log error in winston transports except when executing test suite
if (!isTest) {
  /* app.use(expressWinston.errorLogger({
    winstonInstance
  }));*/
}


app.listen(constants.PORT, err => {
  if (err) {
    console.log('Cannot run!');
  } else {
    console.log(
      `
        App listen on port: ${constants.PORT} 
        Env: ${process.env.NODE_ENV} 
      `
    );
  }
});
module.exports = app;
