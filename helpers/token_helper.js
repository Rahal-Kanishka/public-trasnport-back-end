var express = require('express');

// middleware to verify JWT token
module.exports.verifyToken = function(req, res, next) {
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