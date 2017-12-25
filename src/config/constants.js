require('dotenv').config();

const WHITELIST = {
  posts: {
    create: ['title', 'text'],
    update: ['title', 'text'],
  },
  users: {
    create: ['email', 'username', 'password'],
  },
};

const devConfig = {
  JWT_SECRET: process.env.JWT_SECRET_DEV,
  MONGO_URL: process.env.MONGO_URL_DEV,
  FLIGHTAWARE_USERNAME:process.env.FLIGHTAWARE_USERNAME,
  FLIGHTAWARE_PASSWORD:process.env.FLIGHTAWARE_PASSWORD,
  FLIGHTAWARE_URI:'http://flightxml.flightaware.com/json/FlightXML3/'
};

const testConfig = {
  JWT_SECRET: process.env.JWT_SECRET_TEST,
  MONGO_URL: process.env.MONGO_URL_TEST,
  FLIGHTAWARE_USERNAME:process.env.FLIGHTAWARE_USERNAME,
  FLIGHTAWARE_PASSWORD:process.env.FLIGHTAWARE_PASSWORD,
  FLIGHTAWARE_URI:'http://flightxml.flightaware.com/json/FlightXML3/'
};

const prodConfig = {
  JWT_SECRET: process.env.JWT_SECRET_PROD,
  MONGO_URL: process.env.MONGO_URL_PROD,
  FLIGHTAWARE_USERNAME:process.env.FLIGHTAWARE_USERNAME,
  FLIGHTAWARE_PASSWORD:process.env.FLIGHTAWARE_PASSWORD,
  FLIGHTAWARE_URI:'http://flightxml.flightaware.com/json/FlightXML3/'
};

const defaultConfig = {
  PORT: process.env.PORT || 3001,
  // RAVEN_ID: process.env.RAVEN_ID,
  WHITELIST,
};

function envConfig(env) {
  switch (env) {
    case 'development':
      return devConfig;
    case 'test':
      return testConfig;
    default:
      return prodConfig;
  }
}

module.exports=  {
  ...defaultConfig,
  ...envConfig(process.env.NODE_ENV),
};
