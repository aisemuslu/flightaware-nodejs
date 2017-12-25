/**
 * Configuration of the server middlewares.
 */

const bodyParser = require('body-parser');
const morgan = require('morgan');
const compression = require('compression');
const passport = require('passport');
const expressWinston = require('express-winston');
// const methodOverride =require('method-override');
const helmet = require('helmet');
const cors = require('cors');
// const expressStatusMonitor =require('express-status-monitor');

const winstonInstance = require('./winston');

const isTest = process.env.NODE_ENV === 'test';
const isDev = process.env.NODE_ENV === 'development';

module.exports = app => {
  app.use(compression());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(passport.initialize());
  app.use(helmet());
  app.use(cors());
  // app.use(expressStatusMonitor());
  // app.use(methodOverride());
  if (isDev && !isTest) {
    app.use(morgan('dev'));
    expressWinston.requestWhitelist.push('body');
    expressWinston.responseWhitelist.push('body');
    app.use(
      expressWinston.logger({
        winstonInstance,
        meta: true,
        msg:
          'HTTP {{req.method}} {{req.url}} {{res.statusCode}} {{res.responseTime}}ms',
        colorStatus: true,
      }),
    );
  }

 

};
