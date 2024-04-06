const deviceModel = require("../models/DeviceModel");

exports.createDevice = async (req, res) => {
    try {
         //console.log("createDevice ")
        const { uniqueSerialNumber, type, image, status } = req.body;

        // location already exists check
        const existingDevice = await DeviceModel.findOne({ uniqueSerialNumber });
        if (existingDevice) {
            return res.status(401).json({ message: "uniqueSerialNumber already exists" });
        }

        // Create a new location
        const newDevice = new DeviceModel({
            uniqueSerialNumber,
            type,
            image,
            status
        });
        const savedDevice = await newDevice.save();
        res.json(savedDevice);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};