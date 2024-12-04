const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth')
const upload = require('../middleware/upload')
const { getAllSkills, addNewSkill, updateSkill, deleteSkill } = require('../controllers/skillController');

router.get('/getAllSkills', getAllSkills);
router.post('/addNewSkill', auth, upload.single('imageUrl'), addNewSkill);
router.put('/updateSkill/:id', auth, upload.single('imageUrl'), updateSkill);
router.delete('/deleteSkill/:id', auth, deleteSkill);

module.exports = router;