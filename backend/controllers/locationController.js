const LocationModel = require("../models/LocationModel");

exports.createLocation = async (req, res) => {
    try {
         //console.log("rttttttt")
        const { humanReadableName, address, phone, multipleADevices } = req.body;

        // location already exists check
        const existingLocation = await LocationModel.findOne({ humanReadableName });
        if (existingLocation) {
            return res.status(401).json({ message: "Location already exists" });
        }

        // Create a new location
        const newLocation = new LocationModel({
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
exports.getAllLocation = async (req, res) => {
    try {
        const locations = await LocationModel.find();
        res.json(locations);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};