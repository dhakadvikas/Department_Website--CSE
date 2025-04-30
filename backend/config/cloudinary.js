// config/cloudinary.js
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
require("dotenv").config();


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,

});

// Configure PDF upload
const storage = new CloudinaryStorage({
    cloudinary,
    params: async (req, file) => {
      const ext = file.originalname.split('.').pop().toLowerCase();
      let resourceType = 'raw';
  
      if (['jpg', 'jpeg', 'png', 'webp', 'svg'].includes(ext)) resourceType = 'image';
      else if (['mp4', 'mov', 'avi'].includes(ext)) resourceType = 'video';
      else if (['xlsx', 'xls', 'csv'].includes(ext)) resourceType = 'raw'; // Explicitly handle Excel files
  
      return {
        folder: 'uploads',
        resource_type: resourceType,
        format: ext,
      };
    },
  });

const upload = require('multer')({ storage });

module.exports = upload;
