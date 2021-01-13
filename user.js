var express = require('express');
var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var bodyParser = require('body-parser');


const User = require('./models/User');
var router = express.Router();
// create application/json parser
var jsonParser = bodyParser.json()


// driver model 
/* var userSchema = mongoose.Schema({
	_id: String,
	name: String,
	username: String,
	password: String,
	contact: String,
	address: String,
	role_id: String,
	bookings: [{
		bookingId: String,
		seats: String,
		price: String,
		scheduleId: String
	}]
}, { collection: 'user' });
var User = mongoose.model("User", userSchema); */

// get user by name
router.get('/:name', function (req, res) {
	console.log('name: ', req.params.name);
	User.findOne({ username: req.params.name }, function (err, obj) {
		console.log(obj);
		res.send(obj);
		return obj;
	});

});

// user registration
router.post('/register', jsonParser, function (req, res) {

	console.log('body: ', req.body);
	let errors = [];
	const { firstName, lastName, userName, type, address, contact, password } = req.body;

	if (!firstName || !userName || !type || !address || !contact || !password) {
		errors.push({ msg: "required fields must not be empty" });
	}

	if (errors.length > 0) {
		// sending error response
		res.send({
			result: false,
			data: errors
		});
	} else {
		// check username aready exits
		User.findOne({ userName: userName }, function (err, obj) {
			console.log(obj);
			if (obj) {
				errors.push({ msg: "email is already exits!" });
				// sending error response (400 bad request)
				res.status(400).send({
					result: false,
					data: errors
				});
			} else {
				// add user to db
				const newUser = new User({
					firstName,
					lastName,
					userName,
					password,
					contact,
					address,
					type
				});
				// hashng the password
				bcrypt.genSalt(10, (err, salt) => {
					bcrypt.hash(newUser.password, salt, (err, hash) => {
						if (err) throw err;
						// update password
						newUser.password = hash;
						// save to db
						newUser.save().then(user => {
							res.status(200).send({
								result: true,
								data: user
							});
						}).catch(err => console.log(err));
					})
				});
			}

		});

	}
});


module.exports = router;
