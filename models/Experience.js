const mongoose = require("mongoose")

const ExperienceSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: true 
    }, 
    company: { 
        type: String, 
        required: true 
    }, 
    location: { 
        type: String 
    },
    startDate: { 
        type: Date, 
        required: true 
    }, 
    endDate: { 
        type: Date 
    }, 
    description: { 
        type: [String], default: [] 
    }, 
    technologies: { 
        type: [String], default: []  
    }, 
    imageUrl: { 
        type: String 
    }, 
    isCurrent: { 
        type: Boolean, 
        default: false 
    }, 
    createdAt: { 
        type: Date, 
        default: Date.now 
    }, // Timestamp for record creation
})

module.exports = mongoose.model('Experience', ExperienceSchema);
