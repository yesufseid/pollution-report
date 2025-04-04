const express = require("express");
const router = express.Router();
const {SignIn,SignUp,createReport,getUserReports} = require("../controllers/index");

// Define routes
router.route("/").get(getUserReports).post(createReport);
router.route("/sign-up").post(SignUp);
router.route("/sign-in").post(SignIn)

module.exports = router; 
