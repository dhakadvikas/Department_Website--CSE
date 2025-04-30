const placementData  = require("../models/placementData");
const axios = require('axios');
const XLSX = require('xlsx');


const createData = async (req , res) => {
      try{
            const {stdName , package , companyName , year } = req.body;
            console.log(req.body);
            if(!stdName || !package || !companyName || !year) 
               res.status(400).json({"msg": " all filed are required ."});
            else{
            const stdData  =  new placementData({stdName , package , companyName , year});
               await stdData.save();
               res.status(200).json(stdData);
            }

         }
         catch (error){
            res.status(400).json({ error: error.message });
         }

   }

   const getData = async (req,res)=>{

      try{
      const data = await placementData.find(); // fetching data yearwise .
      if(data) 
      res.status(201).json({ "result" : data });
      else
      res.status(201).json({"msg": "empty database ."})
      } catch(error){

         res.status(400).json({"msg": " all filed are required ."});
      }


   }

   //upload placement data using multer in excel format .
   const uploadPlacementData = async (req, res) => {
      try {
         const file = req.file;
         if (!file) {
            return res.status(400).json({ message: "Please upload a file" });
         }

         // Fetch the file from Cloudinary
         const response = await axios.get(file.path, { responseType: 'arraybuffer' });
         const workbook = XLSX.read(response.data, { type: 'buffer' });

         const sheetName = workbook.SheetNames[0];
         const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

         

         // Save data to MongoDB
         if (await placementData.find({ enrollNo: data[0].enrollNo })) {
            data.forEach(async (student) => {
               await placementData.findOneAndUpdate(
                  { enrollNo: student.enrollNo },
                  { ...student, student },
                  { upsert: true, new: true }
               );
            });
         } else {
            await placementData.insertMany(data);
         }

         res.status(200).json({ message: 'Data uploaded successfully' });
      } catch (error) {
         res.status(500).json({ error: error.message });
      }
   };

module.exports= {createData, getData, uploadPlacementData};