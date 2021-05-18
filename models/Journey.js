var mongoose = require('mongoose');

var journeySchema = mongoose.Schema({
    route_id: String,
    drivers : [{
        driver_id: String,
        location: Object,
        speed: Object,
        rotation: Object,
        updated_time: String,
        journey_ongoing: Boolean
    }]
}, { collection: 'journey'});

var Journey = mongoose.model("Journey", journeySchema);

module.exports = Journey;
