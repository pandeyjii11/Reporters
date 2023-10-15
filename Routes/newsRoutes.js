const express = require("express");
const router = express.Router();



// Import Controllers
const {createNews, deleteNews, editNews, getFullNewsDetails, reportersNewsDetails, getAllNews} = require("../Controllers/news")



// import middlewares
const {auth, isAdmin, isReporter, isEditor} = require("../Middlewares/auth");



// Cretae Routes
// CreateNews Route
router.post("/createNews", auth, isReporter, createNews);

// EditNews Route
router.put("/editNews", auth, isReporter, editNews);

// DeletNews Route
router.delete("/deleteNews", auth, isReporter, deleteNews);

// getFullNewsDetails Route
router.post("/getFullNewsDetails", auth, isReporter, getFullNewsDetails);

// reportersNewsDetais Route
router.post("/reportersNewsDetails", auth, isReporter, reportersNewsDetails);

// getAllNews Route
router.get("/getAllNews", getAllNews);

module.exports = router;
