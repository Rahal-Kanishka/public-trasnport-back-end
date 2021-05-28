var mongoose = require('mongoose');

// driver model
var complaintSchema = mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    heading: String,
    complaint: String,
    status: String,
    created_on: String,
    updated_on: String
},{ collection: 'complaint' });
var Complaint = mongoose.model("Complaint", complaintSchema);

module.exports = Complaint;
