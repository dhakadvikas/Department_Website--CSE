const mongoose = require("mongoose");

const academicSchema = new mongoose.Schema({
    title: { type: String, required: true },
    file: { type: String, required: true }, // Store file path instead of buffer
    status:{enum :['syllabus', 'calender','general', ],type:String},
    date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Academic", academicSchema);
