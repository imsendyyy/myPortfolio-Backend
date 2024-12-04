const express = require('express');
const router = express.Router();

const auth = require("../middleware/auth");
const { getExperiences, addNewExperience, updateExperience, deleteExperience } = require("../controllers/experienceController")


router.get('/getAllExperiences', getExperiences);
router.post('/addNewExperience', auth, addNewExperience);
router.put('/updateExperience/:id', auth, updateExperience);
router.delete('/deleteExperience/:id', auth, deleteExperience)

module.exports = router ;
