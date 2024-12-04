const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth')
const upload = require('../middleware/upload')
const { getProjects, addProject, updateProject, deleteProject } = require('../controllers/projectController');

router.get('/getAllProjects', getProjects);
router.post('/createNewProject', auth, upload.single('image'), addProject);
router.put('/updateProject/:id', auth, upload.single('image'), updateProject);
router.delete('/deleteProject/:id', auth, deleteProject)

module.exports = router;