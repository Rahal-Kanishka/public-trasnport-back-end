var mongoose = require('mongoose');

var ScheduleSchema = mongoose.Schema({
   startTime: String,
   routeID: String,
   startLocation: String,
   endLocation: String,
   busID: String,

}, { collection: 'schedule'});

var Schedule = mongoose.model("Schedule", ScheduleSchema);

module.exports = Schedule;