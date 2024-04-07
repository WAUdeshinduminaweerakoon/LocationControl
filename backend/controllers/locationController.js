const LocationModel = require("../models/LocationModel");
const CounterModel = require("../models/CounterModel");


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
exports.getAllLocation = async (req, res) => {
    try {
        const locations = await LocationModel.find();
        res.json(locations);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
//exports.deleteLocation = async (req, res) => {
//     //console.log("herouhbu");
//    try {
//    //console.log("try");
//        const existingLocation = await LocationModel.findOne({id : req.body.id , humanReadableName : req.body.humanReadableName});
//
//        if (existingLocation){
//            await LocationModel.deleteOne({id : req.body.id})
////            res.status().json("Unautho");
//            return res.status(200).json(await LocationModel.find({humanReadableName : req.body.humanReadableName}));
//        }else {
//            res.status(403).json("Unauthorized");
//        }
//    } catch (error) {
//        res.status(500).json({ error: error.message });
//    }
//};
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