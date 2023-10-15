const mongoose = require("mongoose");
require("dotenv").config();

const dbConnect = () => {
    mongoose.connect(process.env.DATABASE_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => console.log("DB Connecion Successful")).catch((err) => {
        console.log("DB Connection failed");
        console.error(err);

        process.exit(1);
    });
}

module.exports = dbConnect;