var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
const driverProfileModel = require('./models/DriverProfile');
const userModel = require('./models/User');
const RouteModel = require('./models/Route');
const journeyModel = require('./models/Journey');
const url = require('url');
const querystring = require('querystring');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json()

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

router.get('/current_drivers', async function (req, res) {
	let parsedUrl = url.parse(req.url);
	let parsedQs = querystring.parse(parsedUrl.query);
	console.log('get route id', parsedQs.route_id);
	var response = await getDriversByRoute(parsedQs.route_id);
	console.log('response: ', response);
	res.send(response);
	return response;
});

router.get('/driver', async function (req, res) {
	let parsedUrl = url.parse(req.url);
	let parsedQs = querystring.parse(parsedUrl.query);
	console.log('get driver by id', parsedQs.driver_id);
	var response = await getDriverByID(parsedQs.driver_id);
	console.log('response: ', response);
	res.send(response);
	return response;
});

router.get('/driver_profile', async function (req, res) {
	let parsedUrl = url.parse(req.url);
	let parsedQs = querystring.parse(parsedUrl.query);
	console.log('get driver by id', parsedQs.driver_id);
	var response = await getDriverProfileByDriverID(parsedQs.driver_id);
	console.log('response: ', response);
	res.send(response);
	return response;
});

router.put('/driver_location', jsonParser, async function (req, res) {

	console.log('driver location data', req.body);
	const { driver_id, route_id, lat, lng, speed, rotation } = req.body;
	var returnData = await UpdateDriverRealtimeLocation(driver_id, route_id, lat, lng, speed, rotation);
	console.log('response: ', returnData);
	res.send(returnData);
	return returnData;
});

router.put('/journey_status', jsonParser, async function (req, res) {

	console.log('change journey status data', req.body);
	const { driver_id, route_id, journey_status } = req.body;
	var returnData = await updateDriverJourneyStatus(driver_id, route_id, journey_status);
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


async function UpdateDriverRealtimeLocation(driver_id, route_id, lat, lng, speed, rotation) {

	console.log('driver %s, route %s, lat %s, lng %s', driver_id, route_id, lat, lng);


	var response = await journeyModel.updateOne(
		{
			route_id: route_id,
			"drivers.driver_id": driver_id
		},
		{
			$set:
				{
					"drivers.$.location.lat": lat,
					"drivers.$.location.lng": lng,
					"drivers.$.speed": speed,
					"drivers.$.rotation": rotation,
					"drivers.$.updated_time": new Date().toLocaleString(),
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
	return response;

}

async function updateDriverJourneyStatus(driver_id, route_id, journey_status) {

	var response = await journeyModel.updateOne(
		{
			route_id: route_id,
			"drivers.driver_id": driver_id
		},
		{
			$set:
				{
					"drivers.$.journey_ongoing": journey_status,
					"drivers.$.updated_time": new Date().toLocaleString(),
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
	return response;
}

async function getDriversByRoute(route_id) {

	return journeyModel.findOne({ route_id: route_id }, function (err, obj) {
		if (err) {
			console.log("cant find route")
		} else {
			console.log("routfound: ",obj);
		}
	});
}

async function getDriverByID(driver_id) {
	return userModel.findById(driver_id, function (err, obj) {
		if (err) {
			console.log("cant find route")
		} else {
			console.log("rout found: ",obj);
		}
	});
}

async function getDriverProfileByDriverID(driver_id) {
	return driverProfileModel.findOne({driver_id: driver_id} , function (err, obj) {
		if (err) {
			console.log("cant find route")
		} else {
			console.log("rout found: ",obj);
		}
	});
}

module.exports = router;
