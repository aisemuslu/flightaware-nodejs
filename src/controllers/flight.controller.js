
/**
 * Flight Controller
 */
const redisClient = require('../config/redisClient');
const rp = require('request-promise-native');
const Joi = require('joi');
const HTTPStatus = require('http-status');
const constants = require('../config/constants');
const moment = require('moment');

const APIError = require('../services/error');

// deneme
const validation = {
  search: {
    query: {
      origin: Joi.string().required(),
      destination: Joi.string().required(),
    },
  }

};


async function findFlight(req, res, next) {
  try {

    const cacheKey = `ori:${req.query.origin}:dest:${req.query.destination}`;
    const cacheResult = await getFromRedis(cacheKey);
    if (cacheResult)
      return res.status(HTTPStatus.OK).json(cacheResult);

    const options = {
      uri: `${constants.FLIGHTAWARE_URI}FindFlight`,
      qs: {
        origin: req.query.origin,
        destination: req.query.destination
      },
      auth: {
        user: constants.FLIGHTAWARE_USERNAME,
        pass: constants.FLIGHTAWARE_PASSWORD,
        sendImmediately: false
      },
      json: true // Automatically parses the JSON string in the response
    };

    const { FindFlightResult } = await rp(options);
    if (!FindFlightResult) return res.status(HTTPStatus.OK).json(null);
    const result = FindFlightResult.flights.reduce((arr, flight) => {

      flight.segments.forEach(item => {

        const filedDepartureHour = moment.unix(item.filed_departure_time.epoch);
        const estimatedArrivalHour = moment.unix(item.estimated_arrival_time.epoch);
        const duration = moment.utc(estimatedArrivalHour.diff(filedDepartureHour)).format("HH:mm:ss");


        const f = {
          'ident': item.ident,
          'airCraft': item.aircrafttype,
          'duration': duration,
          'departure_epoch': item.filed_departure_time.epoch,
          'arrival_epoch': item.estimated_arrival_time.epoch,
          'departure': `${item.filed_departure_time.date} ${item.filed_departure_time.time} ${item.filed_departure_time.dow}`,
          'arrival': `${item.estimated_arrival_time.date} ${item.estimated_arrival_time.time} ${item.estimated_arrival_time.dow}`,
        };
        arr.push(f);
      });


      return arr;
    }, []);


    saveToRedis(cacheKey, result);
    return res.status(HTTPStatus.OK).json(result);


  } catch (err) {
    return next(new APIError(err.messeage, HTTPStatus.BAD_REQUEST));
  }
}

async function saveToRedis(searchKey, searchResults) {
  try {


    const multi = redisClient.multi();
    multi.del(searchKey);
    for (let i = 0; i < searchResults.length; i++) {
      multi.rpush(searchKey, JSON.stringify(searchResults[i]));
    }
    // multi.expire(searchKey, 60 * 1);
    multi.exec((errors, results) => {

      console.log(results);

    })
  }
  catch (err) {
    throw err;
  }

}

async function getFromRedis(searchKey) {
  try {
    const bExists = await redisClient.exists(searchKey);
    if (bExists === 0) {
      return null;
    }
    const results = await redisClient.lrange(searchKey, 0, -1);

    return results.map(item => JSON.parse(item));

  }
  catch (err) {
    throw err;
  }

}


module.exports = { findFlight, validation }

