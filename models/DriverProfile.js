var mongoose = require('mongoose');

// driver model 
var driverProfileSchema = mongoose.Schema({
    driver_id: String,
    max_ratings: String,
    rating: String,
    trips: Number
 },{ collection: 'driver_profile' });
 var DriverProfile = mongoose.model("DriverProfile", driverProfileSchema);

module.exports = DriverProfile;
