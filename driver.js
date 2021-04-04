var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
const Driver = require('./models/Driver');
const RouteModel = require('./models/Route');
const url = require('url');
const querystring = require('querystring');

/*router.get('/:name', function(req,res) {
   console.log('get driver',req.params.name);
	Driver.findOne({userName: req.params.name}, function(err,obj) { 
		console.log(obj);
		res.send(obj);
		return obj;
	});
	
});*/

router.get('/driver_location', async function (req, res) {
	let parsedUrl = url.parse(req.url);
	let parsedQs = querystring.parse(parsedUrl.query);
	console.log('get route id', parsedQs.route_id);
	var returnData = await getDriverRealTimeLocation(parsedQs.route_id, parsedQs.count);
	console.log('response: ', returnData);
	res.send(returnData);
	return returnData;
});

/**
 * get real time of the driver for given route id
 * @param route_id id of the requested route
 * @param request_count
 * @returns {Promise<*>}
 */
async function getDriverRealTimeLocation(route_id, request_count) {
	var response = await RouteModel.findById(route_id);
	console.log('request_count: ', request_count);
	console.log('index from count: ', request_count%response.first_trip.route.length);
	// since the index starts at zero
	var driverLocation = response.first_trip.route[request_count%response.first_trip.route.length];
	return driverLocation;
}


module.exports = router;
