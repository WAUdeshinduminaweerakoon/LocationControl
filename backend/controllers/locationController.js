const LocationModel = require("../models/LocationModel")

exports.createLocation = async (req, res) => {
    try {
        const location = req.body.location;
        const existingLocation = await LocationModel.findOne({ location: humanReadableName });
        if (existingUser) {
            return res.status(401).json({ message: "location already exists" });

        }

        const newLocation = new LocationModel({
            humanReadableName: humanReadableName,
            address: req.body.address,
            phone: req.body.phone,
            multipleADevices: req.body.multipleADevices
        });
        const savedLocation = await newLocation.save();
        res.json(savedLocation);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};