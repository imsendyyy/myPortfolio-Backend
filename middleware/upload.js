const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../cloudinary');

// Configure Cloudinary Storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'uploads', // Cloudinary folder to store files
    resource_type: 'auto', // Automatically determines the resource type (image, video, etc.)
    public_id: (req, file) => file.originalname, // File name in Cloudinary
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
