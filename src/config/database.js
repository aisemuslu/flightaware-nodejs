/* eslint-disable no-console */

/**
 * Configuration for the database
 */
const redis = require('redis');
const mongoose =require('mongoose');

const constants=require('./constants');

// Remove the warning with Promise
mongoose.Promise = global.Promise;

// If debug run the mongoose debug options
mongoose.set('debug', process.env.MONGOOSE_DEBUG);

// Connect the db with the url provide
try {
  mongoose.connect(constants.MONGO_URL, {
    useMongoClient: true,
  });
} catch (err) {
  mongoose.createConnection(constants.MONGO_URL, {
    useMongoClient: true,
  });
}

mongoose.connection
  .once('open', () => console.log('MongoDB Running'))
  .on('error', e => {
    throw e;
  });


// Create Redis Client
const client = redis.createClient();
client.on('connect', (req, res, next)=> {
    console.log("Redis is connected!");
});