const fs = require("fs");
const path = require("path");
const Notice = require("../models/notice");

// @desc Create a new notice
// @route POST /notices
// exports.createNotice = async (req, res) => {
//     try {
//         const { title } = req.body;
//         const file = req.file; // File uploaded via multer

//         if (!title || !file) {
//             return res.status(400).json({ message: "Title and file are required" });
//         }

//         const newNotice = new Notice({
//             title,
//             file: { data: file.filename, contentType: file.mimetype }, // Store filename instead of buffer
//         });

//         await newNotice.save();
//         res.status(201).json({ message: "Notice created successfully", notice: newNotice });
//     } catch (error) {
//         res.status(500).json({ message: "Server Error", error: error.message });
//     }
// };

exports.createNotice = async (req, res) => {
    try {
        const { title } = req.body;
        const file = req.file; // File uploaded via Multer

        if (!title || !file) {
            return res.status(400).json({ message: "Title and file are required" });
        }

        const newNotice = new Notice({
            title,
            file: file.path, // Save file path instead of buffer
        });

        await newNotice.save();
        res.status(201).json({ message: "Notice created successfully", notice: newNotice });
    } catch (error) {
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath); // Delete the file
        }
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};


// @desc Get all notices
// @route GET /notices
exports.getAllNotices = async (req, res) => {
    try {
        const notices = await Notice.find().sort({ date: -1 }).limit(10);
        res.status(200).json(notices);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// @desc Get a single notice by ID
// @route GET /notices/:id
exports.getNoticeById = async (req, res) => {
    try {
        const notice = await Notice.findById(req.params.id);
        if (!notice) return res.status(404).json({ message: "Notice not found" });

        res.status(200).json(notice);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// @desc Update a notice
// @route PUT /notices/:id


exports.updateNotice = async (req, res) => {
    try {
        const { title } = req.body;
        const file = req.file; // Uploaded file

        const updatedData = {};
        if (title) updatedData.title = title;
        if (file) updatedData.file = file.path; // Store file path

        const updatedNotice = await Notice.findByIdAndUpdate(req.params.id, updatedData, { new: true });

        if (!updatedNotice) return res.status(404).json({ message: "Notice not found" });

        res.status(200).json({ message: "Notice updated successfully", notice: updatedNotice });
    } catch (error) {
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath); // Delete the file
        }
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// exports.updateNotice = async (req, res) => {
//     try {
//         const { title } = req.body;
//         const file = req.file;

//         const updatedData = {};
//         if (title) updatedData.title = title;
//         if (file) {
//             updatedData.file = { data: file.filename, contentType: file.mimetype };
//         }


        
//         const updatedNotice = await Notice.findByIdAndUpdate(req.params._id, updatedData, { new: true });
//         console.log(updatedNotice)

//         if (!updatedNotice) return res.status(404).json({ message: "Notice not found" });

//         res.status(200).json({ message: "Notice updated successfully", notice: updatedNotice });
//     } catch (error) {
//         res.status(500).json({ message: "Server Error", error: error.message });
//     }
// };

// @desc Delete a notice
// @route DELETE /notices/:id


exports.deleteNotice = async (req, res) => {
    try {
        const notice = await Notice.findById(req.params.id);
        if (!notice) return res.status(404).json({ message: "Notice not found" });

        // Remove file from storage (check if it exists first)
        if (notice.file) {
            const filePath = path.join(__dirname, "..", notice.file); // Adjust path
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath); // Delete the file
            }
        }

        await Notice.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Notice deleted successfully" });
    } catch (error) {
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath); // Delete the file
        }
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};





// exports.deleteNotice = async (req, res) => {
//     try {
//         const notice = await Notice.findById(req.params.id);
//         if (!notice) return res.status(404).json({ message: "Notice not found" });

//         // Remove file from storage
//         const filePath = path.join(__dirname, "../uploads", notice.file.data);
//         if (fs.existsSync(filePath)) {
//             fs.unlinkSync(filePath);
//         }

//         await Notice.findByIdAndDelete(req.params.id);
//         res.status(200).json({ message: "Notice deleted successfully" });
//     } catch (error) {
//         res.status(500).json({ message: "Server Error", error: error.message });
//     }
// };





















// //noticeData , createData, updateData, deleteData

// const noticeDb = require("../models/notice")


// const  noticeData = async (req,res)=>{
    
//     try{
//         const latestNotices = await noticeDb.find()
//         .sort({ date: -1 }) // Sort by date in descending order
//         .limit(10); // Limit to the latest 10 notices (optional)
//         if(!latestNotices) res.status(201).json({"message":" No Notice  "})
//             res.status(201).json(latestNotices);

//     }
//     catch(error){
//         res.status(500).json({ message: error.message });
//     }

// }
// const  createData = async (req,res)=>{
    
//     try{
//             const fileData =null;
//             if(req.file)
//             fileData={data: req.file.buffer, contentType:req.file.minetype};
//             const newNotice = await noticeDb.create(
//             {  title: req.body.title,
//                 file:fileData
//             }
//             );

//             if(!newNotice) 
//                 res.status(400).json({"msg":"required field are nessaray "});

//             res.status(201).json({"message":" suceessfull created "});


//     }
//     catch(error){
//         res.status(400).json({ error: error.message });
//     }

// }

// const  deleteData = async (req,res)=>{
    
//     try{
//         const id = req.query.id;
//         console.log(req.query);
        
//         const deletedNotice = await noticeDb.findByIdAndDelete(id);
//         if (!deletedNotice) return res.status(404).json({ message: 'Notice not found' });
//         res.status(201).json({ message: 'Notice deleted successfully' });

//     }
//     catch(error){
//         res.status(500).json({ message: error.message });
//     }

// }

// module.exports={noticeData,createData, deleteData}