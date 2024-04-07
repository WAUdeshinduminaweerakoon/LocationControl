const DeviceModel = require("../models/DeviceModel");

exports.createDevice = async (req, res) => {
    try {
         console.log("createDevice ")
        const { uniqueSerialNumber, type, image, status } = req.body;

        // device already exists check
        const existingDevice = await DeviceModel.findOne({ uniqueSerialNumber });
        if (existingDevice) {
        console.log("createDevice gyeyy ")
            return res.status(401).json({ message: "uniqueSerialNumber already exists" });
        }

        // Create a new device
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
            return res.status(200).json(await DeviceModel.find({uniqueSerialNumber : req.body.uniqueSerialNumber}));
        }else {
            res.status(403).json("Unauthorized");
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
