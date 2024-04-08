const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const locationSchema = new mongoose.Schema({
    locationId: {
        type: String,
        required: true
    },

    humanReadableName:{
        type: String,
        required: true,
        unique: true
    },
    address:{
        type: String,
        required: true
    },
    phone:{
        type: String,
        required: true
    }
});
const LocationModel = mongoose.model('Location', locationSchema);

module.exports = LocationModel;