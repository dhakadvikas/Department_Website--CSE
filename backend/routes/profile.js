const express = require("express");
const router  =  express.Router();
const {viewProfile,updateProfile} =  require("../controlers/profile");

router.route("/").get(viewProfile);

router.route("/update").get(updateProfile);

module.exports = router;