const Faculty = require("../models/faculty");
const fs = require("fs");
const path = require("path");

// Create a new faculty member
exports.createFaculty = async (req, res) => {
    try {
        const newFaculty = new Faculty(req.body);
        const img = req.file; // File uploaded via Multer
        if (!img || !newFaculty ) return res.status(400).json({ message: "Image is required" });
        newFaculty.img = img.path; // Save file path instead of buffer
        const savedFaculty = await newFaculty.save();
        res.status(201).json({ message: "Faculty member created successfully", faculty: savedFaculty });
    } catch (error) {
      if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath); // Delete the file
              }
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Get all faculty members
exports.getAllFaculty = async (req, res) => {
    try {
        const facultyList = await Faculty.find();
        res.status(200).json(facultyList);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Get a faculty member by ID
exports.getFacultyById = async (req, res) => {
    try {
        const faculty = await Faculty.findById(req.params.id);
        if (!faculty) return res.status(404).json({ message: "Faculty member not found" });
        res.status(200).json(faculty);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Get faculty members by post (regular or non_regular)
exports.getFacultyByPost = async (req, res) => {
    try {
        const { post } = req.params;
        const facultyList = await Faculty.find({ post });
        res.status(200).json(facultyList);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Update faculty member
exports.updateFaculty = async (req, res) => {
    try {
        if (req.file) {
            const img = req.file; // File uploaded via Multer
            req.body.img = img.path; // Save file path instead of buffer
        }
        const updatedFaculty = await Faculty.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedFaculty) return res.status(404).json({ message: "Faculty member not found" });
        res.status(200).json({ message: "Faculty member updated successfully", faculty: updatedFaculty });
    } catch (error) {
      if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath); // Delete the file
            }
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Delete faculty member
exports.deleteFaculty = async (req, res) => {
    try {
        const deletedFaculty = await Faculty.findByIdAndDelete(req.params.id);
        if (!deletedFaculty) return res.status(404).json({ message: "Faculty member not found" });
        res.status(200).json({ message: "Faculty member deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};







































// //facultyData, createData, updataData, deleteData
// const facultyDb = require("../models/faculty");

// const facultyData = async (req, res) => {
//   try {
//     // console.log("this is faculty data router ");
//     // console.log( req.query.role.toUpperCase());
//     const data = await facultyDb.find( {role: req.params.role});
//     if (data) res.status(201).json(data);
//     else res.status(201).json({ msg: "this database is empty" });
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

// const createData = async (req, res) => {
//     try{

//   if(req.body.name && req.body.role && req.body.levelOfPost && req.body.email && req.body.education_Qulification)
//   { const data= await facultyDb.create(req.body)
 
//     res.status(201).json(data);
//   }
//     else 
//     res.status(400).json({"msg":"required field are nessaray "});

// }
// catch(error){
//     req.status(400).json({error:error.message});
// }

// };
// const updateData = async (req, res) => {

//     try{
//         const id = req.query.id;
//         const updatedUser = await facultyDb.findByIdAndUpdate(id, req.body);
//         if (!updatedUser) return res.status(404).json({ message: 'User not found' });
//             console.log(updatedUser);
            
//             res.json({ message: 'User updated successfully' });

//     }
//     catch(error){
//         req.status(400).json({error:error.message});
//     }

// };

// const deleteData = async (req, res) => {

//     try {
//         const deletedUser = await facultyDb.findByIdAndDelete(req.query.id);
//         if (!deletedUser) return res.status(404).json({ message: 'User not found' });
//         res.json({ message: 'User deleted successfully' });
//       } 
//       catch (error) {
//         res.status(500).json({ message: error.message });
//       }

// };

// module.exports = { facultyData, createData, updateData, deleteData };
