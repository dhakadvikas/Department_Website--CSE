const express = require('express');
const router = express.Router();
const trController = require('../controlers/trData');
const upload = require('../config/multerConfig');

// CRUD operations
router.get('/', trController.getAllStudents);
router.get('/:enrollNo', trController.getStudentByEnrollNo);
router.post('/', trController.createStudent);
router.put('/:enrollNo', trController.updateStudent);
router.delete('/:enrollNo', trController.deleteStudent);
router.put("/update-student/:enrollNo", trController.updateDetendList);
// Additional routes
router.get('/count/:year', trController.getTotalStudents);
router.post('/upload', upload.single('file'), trController.uploadExcelFile);
// router.get('/students/sem8-cgpa-6', trController.getStudentsWithCGPA6orMore);
router.get('/students/pdf/:year', trController.generateYearwisePDF);


module.exports = router;