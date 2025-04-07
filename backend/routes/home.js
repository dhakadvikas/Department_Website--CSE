const express = require("express")
const router= express.Router();
const{homepage, about}= require("../controlers/home.js")

router.route("/").get(homepage);

router.route("/about").get(about)

module.exports= router;