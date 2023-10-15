const express = require("express");
const app = express();

require("dotenv").config();
const dbConnect = require("./Config/Database");
const cloudinaryConnect = require("./Config/Cloudinary");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRoutes = require("./Routes/authRoutes");
const categoryRoutes = require("./Routes/categoryRoutes");
const commentRoutes = require("./Routes/commentRoutes");
const newsRoutes = require("./Routes/newsRoutes");
const profileRoutes = require("./Routes/profileRoutes");


// Import the port
const PORT = process.env.PORT || 4000;


// Middlewares
app.use(express.json());
app.use(cookieParser());

app.use(
    cors(
        {
            origin: "*",
            credentials: true
        }
    )
);

app.use(
    fileUpload(
        {
            useTempFiles: true,
            tempFileDir: '/tmp/'
        }
    )
);


// Mount All the api routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/comment", commentRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/news", newsRoutes);


// Cloudinary Connect
cloudinaryConnect();

// Connection to DB
dbConnect();


// Listem to server
app.listen(PORT, () => {
    console.log("Server is up and running at port 4000");
});

// Default route
app.get("/", (req, res) => {
    res.send("Welcome to Home route");
})

