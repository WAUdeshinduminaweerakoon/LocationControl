const Model = require("../models/userModel");

exports.createUser = async (req, res) => {
    try {
        const email = req.body.email;
        const existingUser = await UserModel.findOne({ email: email });
        if (existingUser) {
            return res.status(401).json({ message: "User with this email already exists" });

        }

        const newUser = new UserModel({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: email,
            password: req.body.password
        });
        const savedUser = await newUser.save();
        res.json(savedUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};