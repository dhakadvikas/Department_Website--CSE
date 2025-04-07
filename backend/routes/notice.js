const express = require("express");
const multer = require("multer");
const path = require("path");
const {
    createNotice,
    getAllNotices,
    getNoticeById,
    updateNotice,
    deleteNotice
} = require("../controlers/notice");

const router = express.Router();
const upload = require("../config/multerConfig");




// Routes
router.post("/create", upload.single("file"), createNotice);
router.get("/", getAllNotices);
router.get("/:id", getNoticeById);
router.put("/:id", upload.single("file"), updateNotice);
router.delete("/delete/:id", deleteNotice);

module.exports = router;



































// const express = require("express");
// const router = express.Router();
// const multer = require("multer");
// const {noticeData, createData, deleteData}=require("../controlers/notice");
// const storage = multer.memoryStorage();
// const upload = multer({ storage });


// router.route("/get").get(noticeData);


// router.route("/create").all(upload.single('file')).post(createData);


// router.route("/delete").delete(deleteData);

// module.exports= router;