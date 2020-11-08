

var express = require("express");
var mongoose = require('mongoose');
var app = express();
var admin = require("./admin.js");
var driverModule = require("./driver.js");


// model before defning routes
/*var driverSchema = mongoose.Schema({
   name: String,
   age: Number,
   nationality: String
});
var Driver = mongoose.model("Driver", driverSchema);*/

app.use('/admin',admin);
app.use('/driver',driverModule);

mongoose.connect('mongodb://localhost/transport_db', { useUnifiedTopology: true, useNewUrlParser: true });

const connection = mongoose.connection;

// testing db connection

connection.once("open", function() {
  console.log("MongoDB database connection established successfully");
});

/*app.get('/save', function(req,res) {

var newDriver = new Driver({
	name: 'Rahal',
	age: 23,
	nationality: 'Sri Lankan'
});

newDriver.save(function(err,Driver){
	if (err)
		res.json({ error: err })
		//res.render('show_message', {message: "Database error", type: "error"});
	else
		res.json({
			message: "New driver added",
			type: "success"});
});

	// res.send("Kushani Madam");
});*/

app.get('/login', function(req,res) {
	res.send("login route");
});

app.all('/test', function(req, res){
   res.send("HTTP method doesn't have any effect on this route!");
});


app.get('*', function(req, res){
   res.send('Sorry, this is an invalid URL.');
});


app.listen(3000);
