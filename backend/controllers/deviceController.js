const DeviceModel = require("../models/DeviceModel");
const LocationModel = require("../models/LocationModel");
const mongoose = require('mongoose');


exports.createDevice = async (req, res) => {
console.log("ddsssssssssssssssss");
    try {
        const { uniqueSerialNumber, type, image, status, locationId } = req.body;

        const existingDevice = await DeviceModel.findOne({ uniqueSerialNumber });
        if (existingDevice) {
             res.status(401).json({ message: "uniqueSerialNumber already exists" });
        }

        const newDevice = new DeviceModel({ uniqueSerialNumber, type, image, status });
        const savedDevice = await newDevice.save();

        const location = await LocationModel.findById(locationId);
        if (!location) {
            return res.status(404).json({ message: "Location not found" });
        }

        location.devices.push(savedDevice._id);
        await location.save();

        res.json(savedDevice);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getAllDevice = async (req, res) => {
    try {
        const device = await DeviceModel.find();
        res.json(device);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.deleteDevice = async (req, res) => {
console.log("deleteDevice");
    try {
    console.log("try");
        const existingDevice = await DeviceModel.findOne({id : req.body.id , uniqueSerialNumber: req.body.uniqueSerialNumber});

        if (existingDevice){
            await DeviceModel.deleteOne({id : req.body.id})
//            res.status().json("Unautho");
            res.status(200).json(await DeviceModel.find({uniqueSerialNumber : req.body.uniqueSerialNumber}));
        }else {
            res.status(403).json("Unauthorized");
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.getDevicesInLocation = async (req, res) => {
    try {
        const { locationId } = req.params;

        // Find the location by its ID
        const location = await LocationModel.findById(locationId).populate('devices');

        if (!location) {
            res.status(404).json({ message: "Location not found" });
        }

        // Extract the devices associated with the location
        const devices = location.devices;

        res.json(devices);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

