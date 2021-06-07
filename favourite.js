var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
const url = require('url');
const querystring = require('querystring');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

const favouriteModel = require('./models/Favourite');

router.get('/all', async function (req, res) {
    var returnData = await getAllFavourites();
    console.log('response: ', returnData);
    res.send(returnData);
    return returnData;
});

router.post('/add',jsonParser, async function (req, res) {
    console.log('body: ', req.body);
    let errors = [];
    const { user_id, driver_profile_id } = req.body;

    console.log('driver_profile_id', driver_profile_id)

    if (!user_id || !driver_profile_id) {
        errors.push({ msg: "required fields must not be empty" });
    }
    const createdTime = new Date().toLocaleString();
    var returnData = await addFavourite(user_id,driver_profile_id, createdTime);
    console.log('response: ', returnData);
    res.send(returnData);
    return returnData;
});

async function getAllFavourites() {
    var response = await favouriteModel.find().populate('driver_id');
    console.log('favourites: ', response);
    return response;
}


async function addFavourite(user_id, driver_id, created_on) {
// add favourite driver to db
    const newFavourite = new favouriteModel({
        driver_id,
        user_id,
        created_on
    });
    var response = await newFavourite.save();
    return response;
}

module.exports = router;
