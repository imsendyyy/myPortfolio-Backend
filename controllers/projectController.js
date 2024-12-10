const Project = require('../models/Project');

// Get All Projects
const getProjects = async(req, res) => {

    try {
        const projects = await Project.find();
        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json({ error: 'Server Error While Getting Projects' });
    }
}


// add new project
const addProject = async(req, res) => {
    try {
        let image = null
        if(req.file){
            image = req.file.path;
        }
        const newProject = new Project({
            ...req.body,
            description: JSON.parse(description), 
            techStack: JSON.parse(techStack),
            image: image,
        });
         await newProject.save();
        res.status(200).json({ message: " New Project Created Successfully", project : newProject });
    } catch (error) {
        res.status(500).json({ error: 'Server Error While Creatind New Project' });
    }
}

// Update an existing project (only accessible to admins)
const updateProject = async (req, res) => {
    const { id } = req.params;
    const { title, description, techStack, projectSummary, projectUrl, githubUrl, status } = req.body;

    try {
        let updatedFilds = { title, description, techStack, projectSummary, projectUrl, githubUrl, status }
        if (req.body.description) {
            updatedFields.description = JSON.parse(req.body.description);
        }
        if (req.body.techStack) {
            updatedFields.techStack = JSON.parse(req.body.techStack);
        }
        if(req.file){
            updatedFilds.image = req.file.path;
            console.log(req.file);
        }
        const updatedProject = await Project.findByIdAndUpdate( id, updatedFilds, { new: true });

        if (!updatedProject) {
            return res.status(404).json({ error: 'Project not found' });
        }

        res.status(200).json({ message: 'Project updated successfully', project: updatedProject });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update project' });
    }
};


// Delete Project 
const deleteProject = async(req, res) => {
    const { id } = req.params;

    try{
        const deleteItem = await Project.findByIdAndDelete(id);
        if(!deleteItem) {
            return res.status(404).json({ error : " Project Not Found"})
        }
        res.status(200).json({ message : "Project Deleted Successfully"})
    } catch{
        res.status(500).json({ error : "Server Error While Deleting Project"})
    }
}


module.exports = { getProjects, addProject, updateProject, deleteProject };
