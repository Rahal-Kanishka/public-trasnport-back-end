

var express = require("express");
var mongoose = require('mongoose');
var app = express();
var admin = require("./admin.js");
var driverModule = require("./driver.js");
var busModule = require("./bus.js");
var userModule = require("./user.js");
var busRouteModule = require("./bus-route.js");
var complaintModule = require("./complaint.js");
var dbURI = require('./config/configurations').dbURI;

app.use('/admin',admin);
app.use('/driver',driverModule);
app.use('/bus',busModule);
app.use('/user',userModule);
app.use('/route',busRouteModule);
app.use('/complaint',complaintModule);

mongoose.connect(dbURI, { useUnifiedTopology: true, useNewUrlParser: true });

const connection = mongoose.connection;

// testing db connection

connection.once("open", function() {
  console.log("MongoDB database connection established successfully");
});

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
