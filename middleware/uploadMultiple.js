const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../cloudinary');

// Configure Cloudinary Storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    let resourceType = 'image'; // Default to image
    let publicId = file.originalname.split('.')[0]; // Base filename without extension

    if (file.mimetype === 'application/pdf') {
      resourceType = 'raw'; // Set raw for PDFs
      publicId += '.pdf'; // Explicitly add .pdf extension
    }

    return {
      folder: 'uploads',
      resource_type: resourceType,
      public_id: publicId, // Ensure filename includes .pdf for PDFs
    };
  },
});

// Middleware for multiple uploads
const uploadMultiple = multer({ storage: storage }).fields([
  { name: 'profileImage', maxCount: 1 },
  { name: 'resume', maxCount: 1 },
]);

module.exports = uploadMultiple;


