/**
 * Flight Routes
 */

const express = require('express');

const routes = express.Router();
const validate =require('express-validation');

const FlightController=require('../controllers/flight.controller');


routes.get('/FindFlight', validate(FlightController.validation.search), FlightController.findFlight);



module.exports=routes;
