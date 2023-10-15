const User = require("../Models/User");
const Profile = require("../Models/Profile");
const bcypt = require("bcrypt");
const jwt = require("jsonwebtoken");


exports.signUp = async(req, res) => {
    try {
        const {firstName, lastName, email, password, confirmPasword, role} = req.body;

        // Validate Data
        if(!firstName || !lastName || !email || !password || !confirmPasword || !role) {
            return res.status(400).json(
                {
                    success: false,
                    message: "All Fields Required"
                }
            );
        }

        // is user Already Exists
        const existsUser = await User.find({email: email});
        if(!existsUser) {
            return res.status(400).json(
                {
                    success: false,
                    message: "User Already Exists"
                }
            );
        }

        // check for password and confirm password match
        if(confirmPasword !== password) {
            return res.status(400).json(
                {
                    success: false,
                    message: "Passwords do not match"
                }
            );
        }

        // hash the password
        const hashedPassword = await bcypt.hash(password, 10);

        // Create user and make an entry into the DB
        const profile = await Profile.create({
            gender: null,
            dateOfBirth: null,
            about: null
        });

        const user = await User.create({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: hashedPassword,
            role: role,
            profileInformation: profile._id,
            image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
        });

        // Send a json response
        res.status(200).json(
            {
                success:true,
                message: "User Created Successful",
            }
        );
    }
    catch(err) {
        console.error(err);
        console.log(err.message);

        // Send a json reponse
        res.status(500).json(
            {
                success: false,
                message: "Internal Server Error",
                errorMessage: err.message
            }
        );
    }
}

exports.login = async(req, res) => {
    try {
        // Fetch data
        const {email, password} = req.body;

        // Validate Data
        if(!email || !password) {
            return res.status(400).json(
                {
                    success: false,
                    message: "All Fields Required"
                }
            );
        }

        // Checl if user exists or not
        const user = await User.findOne({email: email}).populate("profileInformation");

        // console.log(user);

        // if user not found
        if(!user) {
            return res.status(404).json(
                {
                    success: false,
                    message: "User Not Found"
                }
            );
        }

        // console.log(password);
        // console.log(user.password);

        // if user Found check for password do not match
        if(!await bcypt.compare(password, user.password))
        {
            return res.status(400).json(
                {
                    success: false,
                    message: "Incorrect Password"
                }
            );
        }

        // If password match then login the user ans create the json web token
        const payload= {
            email: email,
            role: user.role,
            id: user._id,
        }

        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "2h"
        });


        // console.log("token in login: ", token);

        // generate cookie
        const options = {
            expires: new Date(Date.now() + 3*24*60*60*1000),
            httpOnly: true,
        }

        // Send status with cookie creation
        res.cookie("token", token, options).status(200).json(
            {
                success: true,
                token: token,
                message: "User Login Successful",
            }
        );
    }
    catch(err) {
        console.error(err);
        console.log(err.message);

        // Send a json response
        res.status(500).json(
            {
                success: false,
                message: "Internal Server Error"
            }
        );
    }
}

exports.changePassword = async(req, res) => {
    try {
        const userId = req.user.id;
        const {oldPassword, newPassword, confirmNewPasword} = req.body;

        // console.log(oldPassword);
        // console.log(newPassword);
        // console.log(confirmNewPasword);

        // Validate Data
        if(!oldPassword || !newPassword || !confirmNewPasword) {
            return res.status(400).json(
                {
                    success: false, 
                    message: "All Fields Required"
                }
            );
        }

        // if passwords do not match
        if(confirmNewPasword !== newPassword) {
            return res.status(400).json(
                {
                    success: false,
                    message: "Passwords do not match"
                }
            );
        }

        const user = await User.findById(userId);

        // if user not cound
        if(!user) {
            return res.status(404).json(
                {
                    success: false, 
                    message: "User Not Found",
                }
            );
        }

        // check for oldPAsswod match
        if(!await bcypt.compare(oldPassword, user.password))
        {
            return res.status(400).json(
                {
                    success: false, 
                    message: "Incorrect Password"
                }
            );
        }

        const hashedPassword = await bcypt.hash(newPassword, 10);

        user.password = hashedPassword;

        await user.save();

        return res.status(200).json(
            {
                success: true,
                message: "Password Updated Successfully",
                updatedUser: user
            }
        );
    }
    catch(err) {
        console.error(err);
        console.log(err.message);

        // Send json response
        res.status(500).json(
            {
                success: false,
                message: "Internal Server Error"
            }
        );
    }
}