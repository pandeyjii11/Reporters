const express = require("express");
const router = express.Router();

// Import controllers
const {signUp, login, changePassword} = require("../Controllers/Auth");

// import the middlewares

const {auth, isAdmin, isReporter, isEditor} = require("../Middlewares/auth");

// Create routes

// login route
router.post("/login", login);

// signup route
router.post("/signup", signUp);

// changePassword route
router.post("/changePassword", auth, changePassword);


// export router
module.exports = router;