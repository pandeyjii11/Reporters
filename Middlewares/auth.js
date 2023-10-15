const User = require("../Models/User");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = async(req, res, next) => {
    try {
        // Fetch Token 
        const token = req.cookies.token || req.header("Authorization").replace("Bearer ", "");

        // console.log("token: ", token);

        // Check if token is missing or received any token
        if(!token) {
            return res.status(404).json(
                {
                    success: false, 
                    message: "Token is missing"
                }
            );
        }

        // Verify Token usingn secret key
        try {
            // console.log(token);
            const payload = jwt.verify(token, process.env.JWT_SECRET);
            console.log("Payload received from the token is: ", payload);

            // Add the payload to the req user object(req.user) 
            req.user=payload;
        }
        catch(error) {
            return res.status(404).json(
                {
                    success: false,
                    message: "Token is invalid"
                }
            );
        }

        next();
    }
    catch(err) {
        console.error(err);
        console.log(err.message);

        res.status(500).json(
            {
                success: false,
                message: "Internal Server Error"
            }
        );
    }
}

exports.isAdmin = async(req, res, next) => {
    try {
        if(req.user.role !== "Admin")
        {
            return res.status(400).json(
                {
                    success: false,
                    message: "This is aprotected route for Admin only"
                }
            );
        }

        next();
    }
    catch(err) {
        console.error(err);
        console.log(err.message);
        
        // send a json response
        res.status(500).json(
            {
                success: false,
                message: "Internal Server Error"
            }
        );
    }
}

exports.isReporter = async(req, res, next) => {
    try {
        if(req.user.role !== "Reporter")
        {
            return res.status(400).json(
                {
                    success: false, 
                    message: "This is a protected route for Reporter Only"
                }
            );
        }

        next();
    }
    catch(err) {
        console.error(err);
        console.log(err.message);

        // Send a json reponse
        res.status(500).json(
            {
                success: false,
                message: "Internal Server Error"
            }
        );
    }
}

exports.isEditor = async(req, res, next) => {
    try {
        if(req.user.role !== "Editor")
        {
            return res.status(400).json(
                {
                    success: false, 
                    message: "This is a protected route for Editor only"
                }
            );
        }

        next();
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