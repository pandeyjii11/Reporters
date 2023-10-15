const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
        },
        lastName: {
            type: String,
        },
        email: {
            type: String
        },
        password: {
            type: String
        },
        role: {
            type: String,
            enum: ["Reporter", "Editor", "Admin"]
        },
        profileInformation: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Profile"
        },
        image: {
            type:String,
        },
        news: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "News"
            }
        ]
    }
);

module.exports = mongoose.model("User", userSchema);

