var express = require('express');
var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var bodyParser = require('body-parser');
var secretkey = require('./config/configurations').JWTKey;
var jwt = require('jsonwebtoken');

const User = require('./models/User');
var router = express.Router();
// create application/json parser
var jsonParser = bodyParser.json()

// get user by name
router.get('/:name', verifyToken, function (req, res) {
	console.log('userName: ', req.params.name);
	jwt.verify(req.token,secretkey,(err,authData)=>{
		if(err) {
			console.log('invalid token');
			res.status(403).send({
				result: false,
				data: 'invalid Token'
			})
		} else {
			// valid token
			console.log('valid token');
			User.findOne({ userName: req.params.name }, function (err, obj) {
				console.log(obj);
				res.send(obj);
				return obj;
			});
		}
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

router.post('/login', jsonParser, function (req, res) {
	const { userName, password } = req.body;

	let errors = [];

	if (!userName || !password) {
		errors.push({ msg: 'Username or password can not be empty' });
		res.status(400).send({
			result: false,
			data: errors
		});
	} else {
		// check username exits
		User.findOne({ userName: userName }, function (err, userObj) {
			if (userObj) {
				// hashing password
				bcrypt.compare(password, userObj.password, (err, isMatch) => {
					if (err) throw err;
					if (isMatch) {
						// creating JWT token using retrieved user-object as payload
						jwt.sign({ userObj }, secretkey, (err, token) => {
							res.status(200).send({
								result: true,
								data: userObj,
								token: token
							});
						});

						/* res.status(200).send({
							result: true,
							data: userObj
						}); */
					} else {
						errors.push({ msg: 'Invalid Username or password' });
						res.status(400).send({
							result: true,
							data: errors
						});
					}
				});
			} else {
				errors.push({ msg: 'Invalid username or password' });
				res.status(400).send({
					result: false,
					data: errors
				});
			}
		});
	}

});

// middleware to verify JWT token
function verifyToken(req, res, next) {
	const bearerHeader = req.headers['authorization'];

	if (typeof bearerHeader !== 'undefined') {
		bearerToken = bearerHeader.split(' ')[1];
		req.token = bearerToken;
		next();
	} else {
		console.log('missing token in header');
		res.status(403).send({
			result: false,
			data: 'missing token in header'
		})
	}
}


module.exports = router;
