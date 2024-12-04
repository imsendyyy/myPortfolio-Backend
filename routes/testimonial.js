const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth")
const upload = require("../middleware/upload");
const {getTestimonials, addNewTestimonial, updateTestimonial, deleteTestimonial} = require("../controllers/testimonialController")


router.get('/getAllTestimonials', getTestimonials);
router.post('/addNewTestimonial', auth, upload.single('imageUrl'), addNewTestimonial);
router.put('/updateTestimonial/:id', auth, upload.single('imageUrl'),  updateTestimonial);
router.delete('/deleteTestimonial/:id', auth , deleteTestimonial);

module.exports = router;