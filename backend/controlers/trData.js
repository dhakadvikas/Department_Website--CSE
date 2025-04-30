const TrSheet = require('../models/trSheet');
const axios = require('axios');

// Get all students
const getAllStudents = async (req, res) => {
    try {
        const students = await TrSheet.find().sort('enrollNo');
        res.json(students);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get student by enrollNo
const getStudentByEnrollNo = async (req, res) => {
    try {
        const student = await TrSheet.findOne({ enrollNo: req.params.enrollNo });
        if (!student) return res.status(404).json({ message: "Student not found" });
        res.json(student);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new student record
const createStudent = async (req, res) => {
    try {
        const student = new TrSheet(req.body);
        await student.save();
        res.status(201).json(student);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update student record by enrollNo
const updateStudent = async (req, res) => {
    try {
        const updatedStudent = await TrSheet.findOneAndUpdate(
            { enrollNo: req.params.enrollNo },
            req.body,
            { new: true }
        );
        if (!updatedStudent) return res.status(404).json({ message: "Student not found" });
        res.json(updatedStudent);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete student record by enrollNo
const deleteStudent = async (req, res) => {
    try {
        const deletedStudent = await TrSheet.findOneAndDelete({ enrollNo: req.params.enrollNo });
        if (!deletedStudent) return res.status(404).json({ message: "Student not found" });
        res.json({ message: "Student deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const getTotalStudents = async (req, res) => {
    try {
        const { year } = req.params; // Extract year from URL params
        if (!year) {
            return res.status(400).json({ message: "Year parameter is required" });
        }
        const totalCount = await TrSheet.countDocuments({ year: Number(year) });
        const count = await TrSheet.countDocuments({ year: Number(year), sem_8: { $gte: 6 } });

        res.json({ year: Number(year), studentsWithCGPA6orMore: count ,
            totalStudents: totalCount
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



const updateDetendList = async (req, res) => {
    try {
        const { detend } = req.body;
        // Find and update student
   
        const updatedStudent = await TrSheet.findOneAndUpdate(
            { enrollNo: req.params.enrollNo },
            {  detend },
            { new: true }
        );
        if (!updatedStudent) return res.status(404).json({ error: "Student not found" });

        res.json(updatedStudent);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const XLSX = require('xlsx');

const uploadExcelFile = async (req, res) => {
    try {
        const file = req.file;
        if (!file) {
            return res.status(400).json({ message: "Please upload a file" });
        }

        // const workbook = XLSX.readFile(file.path);
        const response = await axios.get(file.path, { responseType: 'arraybuffer' });
        const workbook = XLSX.read(response.data, { type: 'buffer' });
        
        const sheetName = workbook.SheetNames[0];
        const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

        const students = data.map(student => ({
            sem_1: student.sem_1 ? student.sem_1: 0,
            sem_2: student.sem_2 ? student.sem_2: 0,
            sem_3: student.sem_3 ? student.sem_3: 0,
            sem_4: student.sem_4 ? student.sem_4: 0,
            sem_5: student.sem_5 ? student.sem_5: 0,
            sem_6: student.sem_6 ? student.sem_6: 0,
            sem_7: student.sem_7 ? student.sem_7: 0,
            sem_8: student.sem_8 ? student.sem_8: 0,
            enrollNo: student.enrollNo,
            name: student.name,
            year: student.year,
            detend: student.detend || false
        }));

        if(await TrSheet.find({ enrollNo: students[0].enrollNo })){
            students.forEach(async (student) => {
                await TrSheet.findOneAndUpdate(
                    { enrollNo: student.enrollNo },
                   {...student, student},
                    { upsert: true, new: true }
                );
            })
        }
        else{
            await TrSheet.insertMany(students);
        }
        // await TrSheet.insertMany(students);
        res.status(201).json({ message: "Students data uploaded successfully", count: students.length });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ...existing code...

const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

/**
 * Generate PDF with student data for a specific year
 * GET /api/students/pdf/:year
 */
const generateYearwisePDF = async (req, res) => {
    try {
        const { year } = req.params;
        
        if (!year) {
            return res.status(400).json({ message: "Year parameter is required" });
        }
        
        // Fetch students for the specified year
        const students = await TrSheet.find({ 
            year: Number(year) 
        }).select('enrollNo name detend').sort('enrollNo');
        
        if (students.length === 0) {
            return res.status(404).json({ message: "No students found for this year" });
        }
        
        // Create a PDF document
        const doc = new PDFDocument();
        
        // Set response headers for PDF download
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename=students-${year}.pdf`);
        
        // Pipe the PDF to the response
        doc.pipe(res);
        
        // Add title and metadata
        doc.fontSize(20).text(`Detaintion list - ${year}`, {
            align: 'center'
        });
        
        doc.moveDown(0.5);
        
        // Add current date
        const currentDate = new Date().toLocaleDateString();
        doc.fontSize(10).text(`Generated on: ${currentDate}`, {
            align: 'right'
        });
        
        doc.moveDown(1);
        
        // Add table headers
        doc.text('Enrollment No.', 50, 150).font('Helvetica-Bold');
        doc.text('Student Name', 200, 150).font('Helvetica-Bold');  
        doc.text('Detained', 400, 150).font('Helvetica-Bold');
        
        // Add a line below headers
        doc.moveTo(50, 170).lineTo(550, 170).stroke();
        
        // Add student data
        let y = 190;
        students.forEach((student, index) => {
            // Add a page break if needed
            if (y > 700) {
                doc.addPage();
                y = 50;
                
                // Add headers on new page
                doc.fontSize(12).text('Enrollment No.', 50, y);
                doc.text('Student Name', 200, y);
                doc.text('Detained', 400, y);
                
                // Add a line below headers
                doc.moveTo(50, y + 20).lineTo(550, y + 20).stroke();
                y += 40;
            }
            
            doc.fontSize(12).text(student.enrollNo, 50, y);
            doc.text(student.name, 200, y);
            doc.text(student.detend ? 'Yes' : 'No', 400, y);
            
            // Add alternating row background for better readability
            if (index % 2 === 0) {
                doc.rect(45, y - 5, 510, 20).fillAndStroke('#f6f6f6', '#f6f6f6');
                doc.fillColor('#000000') 
                     .text(student.enrollNo, 50, y)
                      .text(student.name, 200, y)
                      .text(student.detend ? 'Yes' : 'No', 400, y); 
                
            }
            
            y += 20;
        });
        
        // Finalize the PDF
        doc.end();
        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



module.exports = {
    getAllStudents,
    getStudentByEnrollNo,
    createStudent,
    updateStudent,
    deleteStudent,
    getTotalStudents,
    updateDetendList,
    uploadExcelFile,
    generateYearwisePDF,
    // getStudentsWithCGPA6orMore
};
