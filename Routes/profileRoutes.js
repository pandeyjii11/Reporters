const express = require("express");
const router = express.Router();


// import all Controllers
const {editProfile, deleteAccount, getAllUserDetails, updateDisplayPicture, reporterDashboard} = require("../Controllers/Profile");


// import middlewares
const {auth, isAdmin, isReporter, isEditor} = require("../Middlewares/auth");


// create routes
// editProfile Route
router.put("/editProfile", auth, editProfile);

// deleteAccount
router.delete("/deleteAccount", auth, deleteAccount);

// getAllUserDetails
router.post("/getAllUserDetails", auth, getAllUserDetails);

// updateDisplayPicture Route
router.put("/updateDisplayPicture", auth, updateDisplayPicture);

// reportersDashBoard
router.post("/reportersDashboard", auth, isReporter, reporterDashboard);


module.exports = router;

