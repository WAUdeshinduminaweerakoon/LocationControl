const DeviceModel = require("../models/DeviceModel");
const { validLocation } = require('../controllers/locationController');
const LocationModel = require("../models/LocationModel");
const mongoose = require('mongoose');

//exports.createDevice = async (req, res) => {
//    try {
//        const { uniqueSerialNumber, type, image, status, locationId } = req.body;
//        console.log(locationId);
////TODO: create the device first checking the valid location
////        const locationExists = await validLocation(locationId);
////
////        if (!locationExists) {
////            console.log("Invalid locationId");
////            return res.status(404).json({ message: "Invalid locationId" });
////        }
//
//        console.log("Location is valid");
//        const existingDevice = await DeviceModel.findOne({ uniqueSerialNumber });
//        if (existingDevice) {
//            console.log("Device with this serial number already exists");
//            return res.status(401).json({ message: "uniqueSerialNumber already exists" });
//        }
//
//        const newDevice = new DeviceModel({
//            uniqueSerialNumber,
//            type,
//            image,
//            status,
//            locationId,
//        });
//
//        const savedDevice = await newDevice.save();
//        console.log("Device created successfully");
//
//
//        res.json(savedDevice);
//    } catch (error) {
//        console.error("Error creating device:", error);
//        res.status(500).json({ error: error.message });
//    }
//};

exports.createDevice = async (req, res) => {
    try {
        const { uniqueSerialNumber, type, image, status, locationId } = req.body;
        console.log(locationId);

        // Check if the locationId is valid
        const locationExists = await validLocation(locationId);

        if (!locationExists) {
            console.log("Invalid locationId");
            return res.status(404).json({ message: "Invalid locationId" });
        }

        console.log("Location is valid");

        // Check if the device with the given uniqueSerialNumber already exists
        const existingDevice = await DeviceModel.findOne({ uniqueSerialNumber });
        if (existingDevice) {
            console.log("Device with this serial number already exists");
            return res.status(401).json({ message: "uniqueSerialNumber already exists" });
        }

        // Create a new device
        const newDevice = new DeviceModel({
            uniqueSerialNumber,
            type,
            image,
            status,
            locationId,
        });

        // Save the new device
        const savedDevice = await newDevice.save();
        console.log("Device created successfully");

        res.json(savedDevice);
    } catch (error) {
        console.error("Error creating device:", error);
        res.status(500).json({ error: error.message });
    }
};


exports.getAllDevice = async (req, res) => {
    try {
        const devices = await DeviceModel.find();
        res.json(devices);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
// getAllDevice is ok


exports.deleteDevice = async (req, res) => {
    try {
        console.log("deleteDevice-try");
        const { uniqueSerialNumber  } = req.body;

        const existingDevice = await DeviceModel.findOne({ uniqueSerialNumber:  uniqueSerialNumber });

        if (existingDevice) {
            await DeviceModel.deleteOne({ uniqueSerialNumber: uniqueSerialNumber });
            const remainingDevice = await DeviceModel.find({ uniqueSerialNumber });
            return res.status(200).json(remainingDevice);
        } else {
            res.status(403).json("Unauthorized");
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
//   ............. delete Device is ok




////
//exports.getDevicesInLocation = async (req, res) => {
//    try {
//        const { locationId } = req.params;
//
//        const location = await LocationModel.findById(locationId).populate('devices');
//
//        if (!location) {
//            return res.status(404).json({ message: "Location not found" });
//        }
//
//        const devices = location.devices;
//        res.json(devices);
//    } catch (error) {
//        res.status(500).json({ error: error.message });
//    }
//};
