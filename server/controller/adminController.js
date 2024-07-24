const generateToken = require('../utils/generateToken')
const User = require('../models/userModel')
const Vehicle = require('../models/vehicleModel')
const asyncHandler = require("express-async-handler");
const nodemailer = require("nodemailer");
const { RESET_PASSWORD_URL } = require("../constants/constants")


module.exports = {
    registerUser: async (req, res) => {
        try {
            const { name, email, password } = req.body;
            const userExists = await User.findOne({ email: email });

            if (userExists) {
                return res.status(400).json({ error: "User Already Exists" });
            }

            const user = await User.create({
                name,
                email,
                password,
            });

            if (user) {
                console.log(user);
                const token = await generateToken(user._id);
                return res.status(201).json({
                    name: user.name,
                    email: user.email,
                    token: token,
                });
            } else {
                return res.status(400).json({ error: "Registration Failed" });
            }
        } catch (error) {
            console.error(error.message);
            return res.status(500).json({ error: "An Error Occurred" });
        }
    },


    authUser: asyncHandler((async (req, res) => {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (user && (await user.matchPassword(password))) {
            const token = generateToken(user._id);
            res.status(200).json({ name: user.name, email: user.email, token: token });
        } else {
            res.status(404).json("Invalid EmailID or Password")
            throw new Error("Invalid Email or Password");
        }
    })),

    addVehicle: asyncHandler(async (req, res) => {
        console.log(req.body);
        const {
            name,
            description,
            price,
            quantity,
            manufacturer,
            model,
        } = req.body;

        const filenames = req.files.map((file) => file.filename);

        const primaryImage = filenames[0]; // Assuming you use Multer for primary image

        // Assuming you have an array of secondary image file names
        const secondaryImages = req.files.map((file) => file.filename);
        console.log(secondaryImages);
        try {
            const newVehicle = new Vehicle({
                name,
                description,
                price,
                availableQuantity: quantity,
                manufacturer,
                model,
                primaryImage,
                secondaryImages,
            });

            const savedVehicle = await newVehicle.save();
            console.log(savedVehicle);
            res.status(201).json(savedVehicle);
        } catch (error) {
            console.log(error.message);
            res.status(500).json({ message: 'Failed to add the vehicle.' });
        }
    }),

    getAllVehicles: asyncHandler(async (req, res) => {
        try {
            console.log("8");
            const vehicles = await Vehicle.find();

            if (!vehicles) {
                res.status(404).json({ message: 'No vehicles found.' });
            } else {
                res.status(200).json(vehicles);
            }
        } catch (error) {
            console.error(error.message);
            res.status(500).json({ message: 'Failed to fetch vehicles.' });
        }
    }),

    getVehicle: asyncHandler(async (req, res) => {
        try {
            const { id } = req.params;

            const vehicle = await Vehicle.findById(id);

            if (!vehicle) {
                return res.status(404).json({ message: 'Vehicle not found.' });
            }

            res.status(200).json(vehicle);
        } catch (error) {
            console.error(error.message);
            res.status(500).json({ message: 'Failed to fetch vehicle details.' });
        }
    }),

    deleteVehicle: async (req, res) => {
        try {
            const { id } = req.params;

            const vehicle = await Vehicle.findById(id);

            if (!vehicle) {
                return res.status(404).json({ message: 'Vehicle not found.' });
            }

            // Perform the deletion using deleteOne
            const deletedVehicle = await Vehicle.deleteOne({ _id: id });

            if (deletedVehicle.deletedCount === 1) {
                res.status(200).json({ message: 'Vehicle deleted successfully.' });
            } else {
                res.status(500).json({ message: 'Failed to delete vehicle.' });
            }
        } catch (error) {
            console.error(error.message);
            res.status(500).json({ message: 'Failed to delete vehicle.' });
        }
    },
    getForgotPasswordLink: (async (req, res) => {

        const { email } = req.body;

        try {
            const oldUser = await User.findOne({ email });
            if (!oldUser) {
                return res.status(404).json({ status: "User Not Exists!!" });
            }
            const token = await generateToken(oldUser._id)
            const link = `${RESET_PASSWORD_URL}`;

            var transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    user: process.env.SMTP_MAIL,
                    pass: process.env.SMTP_PASS,
                },
            });

            let info = await transporter.sendMail({
                from: process.env.SMTP_MAIL, // sender address
                to: email, // list of receivers
                subject: "Password Reset for Lounge", // Subject line
                html: `<p>Hi there,</p>
                   <p>You have requested to reset your password. Please click on the following link to reset your password:</p>
                   <a href="${link}">${link}</a>
                   <p>If you did not make this request, please ignore this email.</p>`, // html body
            });

            if (info) {
                res.status(201).json({ message: "Link Sent" })
            }
            console.log("Message sent: %s", info.messageId);
            console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));


        } catch (error) {
            console.log(error.message);
        }

    }),

    resetPassword: (async (req, res) => {
        try {
            const { email, password } = req.body;
            const userData = await User.findOne({ email })
            if (!userData) {
                res.status(404).json("Invalid Email")
            } else {
                console.log("11");
                userData.password = password;
                const user = await userData.save();
                console.log(user);
                if (user) {
                    res.status(201).json({ user, host })
                }
            }
        } catch (error) {
            console.log(error.message);
        }

    }),
}


