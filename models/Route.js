var mongoose = require('mongoose');

var RouteSchema = mongoose.Schema({
   name: String,
   number: String, // route number eg: 154
   Description: String
}, { collection: 'route'});

var Route = mongoose.model("Route", RouteSchema);

module.exports = Route;