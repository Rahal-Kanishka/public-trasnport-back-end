var mongoose = require('mongoose');

var bookingSchema = mongoose.Schema({
    scheduleID: String, //to-do: need to remove
    totalCost: String,
    number_of_seats: String,
    time: String,
    status: String, // comlpeted, in-progress
 },{ collection: 'booking' });
 var Booking = mongoose.model("Booking", bookingSchema);

 module.exports = Booking;