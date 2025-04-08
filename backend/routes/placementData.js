const express = require("express");
const router = express.Router();
const {createData, getData} = require("../controlers/placementData");
const uploadPlacementData = require("../controlers/placementData");
const upload = require("../config/cloudinary.js");



router.route("/").post(createData);

router.route("/").get(getData);
router.route("/upload").post(upload.single("file"), uploadPlacementData.uploadPlacementData);
// router.post('/upload', upload.single('file'), uploadPlacementData);

module.exports = router;