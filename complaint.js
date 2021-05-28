var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
const url = require('url');
const querystring = require('querystring');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

const complaintModel = require('./models/Complaint');

router.get('/all', async function (req, res) {
    var returnData = await getAllComplaints();
    console.log('response: ', returnData);
    res.send(returnData);
    return returnData;
});

router.post('/add_complaint',jsonParser, async function (req, res) {
    console.log('body: ', req.body);
    let errors = [];
    const { user_id, heading, complaint } = req.body;

    if (!user_id || !heading || !complaint) {
        errors.push({ msg: "required fields must not be empty" });
    }
    const createdTime = new Date().toLocaleString();
    const updatedTime = null;
    var returnData = await addComplaint(user_id,heading, complaint, 'new', createdTime , updatedTime);
    console.log('response: ', returnData);
    res.send(returnData);
    return returnData;
});

async function getAllComplaints() {
    var response = await complaintModel.find().populate('user_id');
    console.log('complaints: ', response);
    return response;
}

async function addComplaint(user_id, heading, complaint, status, created_on, updated_on) {
// add complaint to db
    const newUser = new complaintModel({
        user_id,
        heading,
        complaint,
        status,
        created_on,
        updated_on
    });
    var response = await newUser.save();
    return response;
}

module.exports = router;
