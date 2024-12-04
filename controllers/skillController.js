
const Skill = require('../models/Skills');

// Get All Skills 
const getAllSkills = async(req, res) => {
    try {
        const skills = await Skill.find();
        res.status(200).json(skills);
    } catch (error) {
        res.status(500).json({ error: 'Server Error While Getting Skills' });
    }
}


// add new Skill
const addNewSkill = async( req, res) => {
    try {
        let imageUrl = null
        if(req.file){
            imageUrl = req.file.path;
        }
        const newSkill = new Skill({
            ...req.body,
            imageUrl : imageUrl,
        });
        await newSkill.save();
        res.status(200).json({message : "New Skill Added Successfully", skill: newSkill});
    } catch (error) {
        res.status(500).json({ error: 'Server Error While Creatind New Skill' });
    }
}


// update existing Skill 
const updateSkill = async (req, res) => {
    const { id } = req.params;
    const { name, description, category, proficiency } = req.body;

    try {
        let updatedFilds = { name, description, category, proficiency }
        if(req.file){
            updatedFilds.imageUrl = req.file.path
        }
        const upadetedSkills = await Skill.findByIdAndUpdate(id,updatedFilds,{ new : true});

        if (!upadetedSkills) {
            return res.status(404).json({ error: 'Skill not found' });
        }

        res.status(200).json({ message: 'Skill updated successfully', skill: upadetedSkills });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update Skill' });
    }
};


// Delete Skill 
const deleteSkill = async(req, res) => {
    const { id } = req.params;
    try {
        const deleteSkill = await Skill.findByIdAndDelete(id)
        if(!deleteSkill){
            return res.status(404).json({ error : "Skill Not Found"});
        }
        res.status(200).json({ message : "Skill Deleted Successfully"})
    } catch (error) {
        res.status(500).json({ error : " Server Error While Deleting Skill"})
    }
}

module.exports = { getAllSkills, addNewSkill, updateSkill, deleteSkill}