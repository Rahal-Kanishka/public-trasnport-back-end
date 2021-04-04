var mongoose = require('mongoose');

// driver model 
var driverSchema = mongoose.Schema({
    name: String,
    userName: String,
    age: Number,
    nationality: String,
    rating: String,
    trips: Number
 },{ collection: 'driver' });
 var Driver = mongoose.model("Driver", driverSchema);

module.exports = Driver;
