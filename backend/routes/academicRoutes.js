const express = require("express");
const router = express.Router();
const upload = require("../config/multerConfig");
const academicController = require("../controlers/academicController");


router.post("/create", upload.single("file"), academicController.createAcademic);
router.get("/", academicController.getAcademics);
router.get("/:id", academicController.getAcademicById);
router.put("/:id", upload.single("file"), academicController.updateAcademic);
router.delete("/delete/:id", academicController.deleteAcademic);

module.exports = router;
