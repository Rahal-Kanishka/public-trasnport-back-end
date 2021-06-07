var mongoose = require('mongoose');

// favourite model
var favouriteSchema = mongoose.Schema({
    driver_id: { type: mongoose.Schema.Types.ObjectId, ref: 'DriverProfile' },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    created_on: String,
},{ collection: 'favourite' });
var Favourite = mongoose.model("Favourite", favouriteSchema);

module.exports = Favourite;
