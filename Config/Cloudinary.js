const cloudinary = require('cloudinary').v2;
require("dotenv").config();

const cloudinaryConnect = () => {
    try {
        cloudinary.config({
            cloud_name: process.env.CLOUD_NAME,
            api_key: process.env.API_KEY ,
            api_secret: process.env.API_SECRET ,
        });
        console.log("Cloudinary Connection Successful");
    }
    catch(err) {
        console.log("Cloudinary connect failed");
        console.error(err);
        console.log(err.message);
    }
}

module.exports = cloudinaryConnect;