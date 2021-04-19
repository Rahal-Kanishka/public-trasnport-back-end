var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
const Driver = require('./models/Driver');
const RouteModel = require('./models/Route');
const journeyModel = require('./models/Journey');
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


router.put('/driver_location', async function (req, res) {
	let parsedUrl = url.parse(req.url);
	let parsedQs = querystring.parse(parsedUrl.query);
	console.log('get driver id', parsedQs.driver_id);
	var returnData = await UpdateDriverRealtimeLocation(
		parsedQs.driver_id, parsedQs.route_id, parsedQs.lat,
		parsedQs.lng, parsedQs.speed, parsedQs.rotation);
	console.log('response: ', returnData);
	res.send(returnData);
	return returnData;
});

async function UpdateDriverRealtimeLocation(driver_id, route_id, lat, lng, speed, rotation) {

	console.log('driver %s, route %s, lat %s, lng %s', driver_id, route_id, lat, lng);


	var response = await journeyModel.updateOne(
		{
			route_id: route_id,
			"drivers._id": driver_id
		},
		{
			$set:
				{
					"drivers.$.location.lat": lat,
					"drivers.$.location.lng": lng,
					"drivers.$.speed": speed,
					"drivers.$.rotation": rotation,
				}
		},
		{new: true},
		(error, result) => {
			if (error) {
				console.log('error: ', error)
			}
			console.log('updated successfully: ', result);
		}
	);

}


module.exports = router;
