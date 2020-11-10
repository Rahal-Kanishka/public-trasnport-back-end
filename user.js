var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();


// driver model 
var userSchema = mongoose.Schema({
	_id: String,
   name: String,
   username: String,
   password: String,
   contact: String,
   address: String,
   role_id: String,
   bookings : [{
   		bookingId: String,
   		seats: String,
   		price: String,
   		scheduleId: String
   }]
}, { collection: 'user'});
var User = mongoose.model("User", userSchema);

router.get('/:name', function(req,res) {
   console.log('name: ',req.params.name);
	User.findOne({username: req.params.name}, function(err,obj) { 
		console.log(obj);
		res.send(obj);
		return obj;
	});
	
});


module.exports = router;
