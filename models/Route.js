var mongoose = require('mongoose');

var RouteSchema = mongoose.Schema({
   name: String,
   number: String, // route number eg: 154
   Description: String,
   start_location: Object,
   end_location: Object,
   first_trip: Object,
   second_trip: Object
}, { collection: 'route'});

var Route = mongoose.model("Route", RouteSchema);

module.exports = Route;
