const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({

    humanReadableName:{
        type: String,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    phone:{
        type: String,
        required: true
    },
    multipleADevices:{
        type: String,
        required: true

    }
});
const LocationModel = mongoose.model('Location', locationSchema);

module.exports = LocationModel;