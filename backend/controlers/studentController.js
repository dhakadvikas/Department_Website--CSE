const Student = require("../models/student");

// Create a new student
exports.createStudent = async (req, res) => {
    try {
        const student = new Student(req.body);
        await student.save();
        res.status(201).json({ message: "Student created successfully", student });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all students
exports.getAllStudents = async (req, res) => {
    try {
        const students = await Student.find();
        res.json({ count: students.length, students });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a student by enrollment number
exports.getStudentByEnrollment = async (req, res) => {
    try {
        const student = await Student.findOne({ enrollmentNumber: req.params.enrollmentNumber });
        if (!student) return res.status(404).json({ message: "Student not found" });
        res.json(student);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Fetch mid sem data using enrollment number and semester
exports.getMidSemData = async (req, res) => {
    try {
        const { enrollmentNumber, semester } = req.params;
        const student = await Student.findOne({ enrollmentNumber });
        if (!student) return res.status(404).json({ message: "Student not found" });
        
        const semData = student.semesters.find(s => s.semesterNumber == semester);
        if (!semData) return res.status(404).json({ message: "Semester data not found" });
        
        const midSemData = semData.subjects.map(subject => ({
            subjectCode: subject.subjectCode,
            subjectName: subject.subjectName,
            midSem1: subject.midSem1,
            midSem2: subject.midSem2,
            midSem3: subject.midSem3
        }));
        
        res.json({ enrollmentNumber, semester, midSemData });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Update a student
exports.updateStudent = async (req, res) => {
    try {
        const student = await Student.findOneAndUpdate(
            { enrollmentNumber: req.params.enrollmentNumber },
            req.body,
            { new: true }
        );
        if (!student) return res.status(404).json({ message: "Student not found" });
        res.json({ message: "Student updated successfully", student });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete a student
exports.deleteStudent = async (req, res) => {
    try {
        const student = await Student.findOneAndDelete({ enrollmentNumber: req.params.enrollmentNumber });
        if (!student) return res.status(404).json({ message: "Student not found" });
        res.json({ message: "Student deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Add a semester to a student
exports.addSemester = async (req, res) => {
    try {
        const student = await Student.findOne({ enrollmentNumber: req.params.enrollmentNumber });
        if (!student) return res.status(404).json({ message: "Student not found" });
        student.semesters.push(req.body);
        await student.save();
        res.json({ message: "Semester added successfully", student });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
