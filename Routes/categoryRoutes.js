const express = require("express");
const router = express.Router();

// import routes
const {createCategory, getAllCategories, categoryPageDetails} = require("../Controllers/category");

// import middlewares
const {auth, isAdmin, isReporter, isEditor} = require("../Middlewares/auth");


// Create Routes

// createCategory
router.post("/createCategory", auth, isAdmin, createCategory);

// getAllCategories
router.get("/getAllCategories", getAllCategories);

// categoryPageDetails
router.post("/categoryPageDetails", categoryPageDetails);



// export Router
module.exports = router;

