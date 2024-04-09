const LocationModel = require("../models/LocationModel");
const CounterModel = require("../models/CounterModel");
const { CheckDeviceInLocation } = require("../controllers/deviceController");
const deviceController = require("../controllers/deviceController")

exports.createLocation = async (req, res) => {
    try {
        const { humanReadableName, address, phone, multipleADevices } = req.body;
        const existingLocation = await LocationModel.findOne({ humanReadableName });

        if (existingLocation) {
            return res.status(401).json({ message: "Location already exists" });
        }
        const counter = await CounterModel.findOneAndUpdate(
            { _id: "locationId" },
            { $inc: { seq: 1 } },
            { new: true, upsert: true }
        );
        const newLocation = new LocationModel({
            locationId: counter.seq,
            humanReadableName,
            address,
            phone,
            multipleADevices
        });

        const savedLocation = await newLocation.save();
        res.json(savedLocation);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
// create location  ok
exports.deleteLocation = async (req, res) => {
    try {
        const { locationId } = req.body;

        const existingLocation = await LocationModel.findOne({ locationId });
        const DeviceExists = await deviceController.CheckDeviceInLocation(locationId);
        if (DeviceExists) {
            console.log("Invalid locationId");
            return res.status(404).json({ message: "Device in location"});
        }

        if (existingLocation) {
            await LocationModel.deleteOne({ locationId });
            return res.status(200).json({ message: "Location deleted successfully" });
        } else {
            return res.status(404).json({ message: "Location not found" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getAllLocations = async (req, res) => {
    try {
        const locations = await LocationModel.find();
        res.json(locations);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};// is correct

exports.validLocation = async (locationId) => {
    try {
        const checkLocation = await LocationModel.findOne({ locationId });
        return !!checkLocation;
    } catch (error) {
        throw new Error(error.message);
    }
};


