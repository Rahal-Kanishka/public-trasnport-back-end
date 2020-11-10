var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();


// driver model 
var busSchema = mongoose.Schema({
   route: String,
   vehicle_no: String,
   registered_date: String,
   capcity: String,
},{ collection: 'bus' });
var Bus = mongoose.model("Bus", busSchema);

router.get('/all', function(req,res) {
	Bus.find({}, function(err,obj) { 
		console.log(obj);
		res.send(obj);
		return obj;
	});
	
});


module.exports = router;
