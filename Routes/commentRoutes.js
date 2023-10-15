const express = require("express");
const router = express.Router();

// import all Controllers
const {createComment, editComment, deleteComment} = require("../Controllers/comment");


// import middlewares
const {auth, isAdmin, isReporter, isEditor} = require("../Middlewares/auth");


// Create Routes
// create comment
router.post("/createComment", auth, createComment);

// editComment Route
router.put("/editComment", auth, editComment);

// deletComment Route
router.delete("/deleteComment", auth, deleteComment);



// export routes
module.exports = router;

