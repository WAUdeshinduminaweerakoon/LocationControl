const LocationModel = require("../models/LocationModel");
const CounterModel = require("../models/CounterModel");


exports.createDevice = async (req, res) => {
    try {
        const { uniqueSerialNumber, type, image, status, locationId } = req.body;

        const existingDevice = await DeviceModel.findOne({ uniqueSerialNumber });
        if (existingDevice) {
            return res.status(401).json({ message: "uniqueSerialNumber already exists" });
        }

        const newDevice = new DeviceModel({ uniqueSerialNumber, type, image, status, locationId });
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

exports.getAllLocation = async (req, res) => {
    try {
        const locations = await LocationModel.find();
        res.json(locations);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.deleteLocation = async (req, res) => {
    try {
        console.log("deleteLocation-try");
        const { id, humanReadableName } = req.body;

        const existingLocation = await LocationModel.findOne({ id: id, humanReadableName });

        if (existingLocation) {
            await LocationModel.deleteOne({ id: id });
            const remainingLocations = await LocationModel.find({ humanReadableName });
            return res.status(200).json(remainingLocations);
        } else {
            res.status(403).json("Unauthorized");
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};