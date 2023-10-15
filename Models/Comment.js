const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        news: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "News"
        },
        commentText: {
            type: String
        },
        commentDate: {
            type: Date,
            default: Date.now()
        }
    }
);

module.exports = mongoose.model("Comment", commentSchema);