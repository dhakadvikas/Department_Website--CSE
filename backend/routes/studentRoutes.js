const express = require("express");
const router = express.Router();
const studentController = require("../controlers/studentController");

router.post("/students", studentController.createStudent);
router.get("/students", studentController.getAllStudents);
router.get("/students/:enrollmentNumber", studentController.getStudentByEnrollment);
router.put("/students/:enrollmentNumber", studentController.updateStudent);
router.delete("/students/:enrollmentNumber", studentController.deleteStudent);
router.post("/students/:enrollmentNumber/semesters", studentController.addSemester);
router.get("/students/:enrollmentNumber/semesters/:semester/midsem", studentController.getMidSemData);

module.exports = router;
