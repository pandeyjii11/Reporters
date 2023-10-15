const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
        },
        news: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "News"
            }
        ]
    }
);

module.exports = mongoose.model("Category", categorySchema);