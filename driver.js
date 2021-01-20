var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();


// driver model 
var driverSchema = mongoose.Schema({
   name: String,
   userName: String,
   age: Number,
   nationality: String,
   rating: String,
   trips: Number
});
var Driver = mongoose.model("Driver", driverSchema);

router.get('/:name', function(req,res) {
   console.log('get driver',req.params.name);
	Driver.findOne({userName: req.params.name}, function(err,obj) { 
		console.log(obj);
		res.send(obj);
		return obj;
	});
	
});


module.exports = router;
