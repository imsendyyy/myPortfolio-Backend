const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, // From your Cloudinary Dashboard
  api_key: process.env.CLOUDINARY_API_KEY,       // From your Cloudinary Dashboard
  api_secret: process.env.CLOUDINARY_API_SECRET, // From your Cloudinary Dashboard
});

module.exports = cloudinary;