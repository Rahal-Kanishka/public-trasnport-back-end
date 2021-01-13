var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
   firstName: String,
   lastName: String,
   userName: String,
   password: String,
   contact: String,
   address: String,
   type: {
      id: String,
      name: String
   },
   role_id: String,
   bookings : [{
   		bookingId: String,
   		seats: String,
   		price: String,
   		scheduleId: String
   }]
}, { collection: 'user'});

var User = mongoose.model("User", userSchema);

module.exports = User;

