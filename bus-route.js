var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
const BusRoute = require('./models/Route');
const url = require('url');
const querystring = require('querystring');

router.get('/route_by_name/:name', function (req, res) {
    console.log('get path', req.params.name);
    BusRoute.findOne({name: req.params.name}, function (err, obj) {
        console.log(obj);
        res.send(obj);
        return obj;
    });

});

router.get('/route_by_id', function (req, res) {
    let parsedUrl = url.parse(req.url);
    let parsedQs = querystring.parse(parsedUrl.query);
    console.log('get path', parsedQs.id);
    BusRoute.findById(parsedQs.id, function (err, obj) {
        console.log(obj);
        res.send(obj);
        return obj;
    });

});

router.get('/all_routes', function(req,res) {
    BusRoute.find({}, function(err,obj) {
        console.log(obj);
        res.send(obj);
        return obj;
    });

});


module.exports = router;
