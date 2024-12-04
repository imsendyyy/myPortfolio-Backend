const Experience = require("../models/Experience")

// Get All Experience
const getExperiences = async(req, res) => {
    try {
        const exp = await Experience.find();
        res.status(200).json(exp)
    } catch (error) {
        res.status(500).json({ error: 'Server Error While Getting Experience' });
    }
}

// Add New Experience
const addNewExperience = async(req, res) => {
    try {
        const newExp = new Experience(req.body)
        const savedExp = await newExp.save();
        res.status(200).json(savedExp)
    } catch (error) {
        res.status(500).json({ error: 'Server Error While Creating New Experience' });
    }
}

// Update existing Experience
const updateExperience = async(req, res) => {
    const { id } = req.params 
    const { title, company, location, startDate, endDate, description, technologies, imageUrl, isCurrent, } = req.body

    try {
        const updateExp = await Experience.findByIdAndUpdate( 
            id ,
            {title, company, location, startDate, endDate, description, technologies, imageUrl, isCurrent, },
            { new: true }
        )

        if(!updateExp){
            return res.status(404).json({ error: 'Experience not found' });
        }
        res.status(200).json({ message: 'Experience updated successfully', experience: updateExp });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update Experience' });
    }
}


// Delete Existing Experience
const deleteExperience = async(req, res) => {
    const { id } = req.params

    try {
        const deleteExp = await Experience.findByIdAndDelete(id)
         
        if(!deleteExp){
            return res.status(404).json({ error : 'Experience Not Found'})
        }
        res.status(200).json({ message: 'Experience deleted successfully'});
    } catch (error) {
        res.status(500).json({ error: 'Failed to update Experience' });
    }
}

module.exports = {getExperiences, addNewExperience, updateExperience, deleteExperience}