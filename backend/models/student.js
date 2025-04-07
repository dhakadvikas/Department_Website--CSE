const mongoose = require("mongoose");
// //     subject: { type: String },
// //     midSem1: { type: Number,  min: 0, max: 30, default:0 },
// //     midSem2: { type: Number, min: 0, max: 30, default:0 },
// //     midSem3: { type: Number, min: 0, max: 30 , default:0},
// // });
// const marks = { s1:Number,s2:Number,s3:Number,s4:Number,s5:Number};
// const semesterSchema = new mongoose.Schema({
//     sem:{type:Number,min:1,max:8},
//     midSemMarks: marks
// }) ;

// const stdSchema = new mongoose.Schema({
  
//     rollNo:{type:String,  required:true, unique: true},
//     stdName:{type:String, required:true},
//     // semester:[semesterSchema]
//     semester:{type:String, required:true}
// })

// module.exports = mongoose.model("Student",stdSchema);


// Schema for subject with mid-semester exam results
const subjectSchema = new mongoose.Schema({
    subjectCode: { type: String, required: true },
    subjectName: { type: String, required: true },
    midSem1: { type: Number, min: 0, max: 30, default: 0 },
    midSem2: { type: Number, min: 0, max: 30, default: 0 },
    midSem3: { type: Number, min: 0, max: 30, default: 0 },
    totalMarks: { type: Number, min: 0, max: 100, default: 0 },
    grade: { type: String }
});

// Schema for semester data
const semesterSchema = new mongoose.Schema({
    semesterNumber: { type: Number, min: 1, max: 8, required: true },
    subjects: [subjectSchema],
    sgpa: { type: Number, min: 0, max: 10, default: 0 },
    credits: { type: Number, default: 0 },
    completed: { type: Boolean, default: false }
});

// TR Sheet (Transcript) Schema
const trSheetSchema = new mongoose.Schema({
    cgpa: { type: Number, min: 0, max: 10, default: 0 },
    totalCredits: { type: Number, default: 0 },
    backlogCount: { type: Number, default: 0 }
});

// Schema for engineering student
const studentSchema = new mongoose.Schema({
    enrollmentNumber: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    branch: { type: String, required: true },
    batch: { type: String, required: true },
    semesters: [semesterSchema],
    trSheet: trSheetSchema,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

// Pre-save hook to update updatedAt timestamp
studentSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

module.exports = mongoose.model("Student", studentSchema);

