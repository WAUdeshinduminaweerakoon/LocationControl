const DeviceModel = require("../models/DeviceModel");
const LocationModel = require("../models/LocationModel");

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

exports.getAllDevice = async (req, res) => {
    try {
        const devices = await DeviceModel.find();
        res.json(devices);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteDevice = async (req, res) => {
    try {
        const { id, uniqueSerialNumber } = req.body;
        const existingDevice = await DeviceModel.findOne({ id, uniqueSerialNumber });

        if (existingDevice) {
            await DeviceModel.deleteOne({ _id: existingDevice._id });
            return res.status(200).json({ message: "Device deleted successfully" });
        } else {
            res.status(404).json({ message: "Device not found" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getDevicesInLocation = async (req, res) => {
    try {
        const { locationId } = req.params;
        const location = await LocationModel.findById(locationId).populate('devices');

        if (!location) {
            return res.status(404).json({ message: "Location not found" });
        }

        const devices = location.devices;
        res.json(devices);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
