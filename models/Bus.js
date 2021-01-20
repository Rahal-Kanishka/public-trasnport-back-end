var mongoose = require('mongoose');


var busSchema = mongoose.Schema({
    route: String,
    vehicle_no: String,
    registered_date: String,
    capcity: String,
 },{ collection: 'bus' });
 var Bus = mongoose.model("Bus", busSchema);

 module.exports = Bus;