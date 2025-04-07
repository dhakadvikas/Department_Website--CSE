


// studentData , createData, updateData, deleteData 
const stdDb = require("../models/student");


const studentData =  async (req,res) =>{
    try{
        const {roll, sem} = req.params;
        const semData = await stdDb.find({rollNo:roll});
        // if(!std)
        //     res.status(404).json({"message":"Student not found"});
        // const semData = await std.semester.find({sem:sem});
        // if(!semData)
        //     res.status(404).json({"message":"Semester not found"});
        res.status(201).json(semData);

    }
    catch(error){
        res.status(500).json({"message":error.message});
    }
}

const createData =  async (req,res) =>{
    try{
        const {rollNo, stdName,semester} = req.body;
        const std = await stdDb.create({rollNo, stdName,semester});
        if(!std)
            res.status(404).json({"message":"send all required data"})
        res.status(201).json({"message":"std is created "});
    }
    catch(error){
        res.status(500).json({"message":error.message});
    }
}

const updateData =  async (req,res) =>{
    try {
        const {rollNo, semester, subject}=req.params;
        const {midsem1,midsem2, midsem3}=req.body;
        const std= await stdDb.findOne( {rollNo})
        if (!student) {
            return res.status(404).send({ message: "Student not found" });
        }
        const sem= std.sem.findOne({sem:semester});

        

      
    } catch (error) {
        res.status(400).send(error);
    }
}

const deleteData =  async (req,res) =>{
    try {
        const student = await Student.findOneAndDelete({ rollNo: req.params.roll});
        if (!student) {
            return res.status(404).send();
        }
        res.status(200).send(student);
    } catch (error) {
        res.status(500).send(error);
    }
}

module.exports = {studentData, createData, updateData, deleteData};