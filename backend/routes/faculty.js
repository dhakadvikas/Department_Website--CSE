const express = require("express");
const router = express.Router();
const facultyController = require("../controlers/faculty");
const upload = require("../config/multerConfig")

router.post("/create", upload.single("img"), facultyController.createFaculty);
router.get("/", facultyController.getAllFaculty);
router.get("/:id", facultyController.getFacultyById);
router.get("/post/:post", facultyController.getFacultyByPost);
router.put("/:id", upload.single("img"), facultyController.updateFaculty);
router.delete("/delete/:id", facultyController.deleteFaculty);
 
module.exports = router;







































// const express = require("express");
// const router = express.Router();
// const {facultyData, createData, updateData, deleteData}= require("../controlers/faculty")


// router.get( "/get/:role" ,  facultyData );

// router.route("/create").post(createData);

// router.route("/update").patch(updateData);

//  router.route("/delete").delete(deleteData);


// module.exports = router;