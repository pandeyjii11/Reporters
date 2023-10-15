const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema(
    {
        title: {
            type: String,
        },
        content: {
            type: String,
        },
        reporter: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category"
        },
        createdAt: {
            type: Date,
            default: Date.now()
        },
        status: {
            type: String,
            enum: ["Draft", "Published", "Archived"]
        },
        thumbnail: {
            type: String,
        },
        comment: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Comment"
            }
        ]
    }
);

module.exports = mongoose.model("News", newsSchema);