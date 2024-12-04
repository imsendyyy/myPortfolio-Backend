const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    title:{ type: String, required: true},
    image:{ type: String },
    description: { type: String, required: true },
    techStack : { type: [String]},
    projectSummary : { type : String},
    projectUrl : {type : String},
    githubUrl : { type : String},
    status : {
        type: String,
        enum: ['In Progress', 'Completed', 'On Hold'], // Define project status
        default: 'In Progress',
    },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Project", ProjectSchema);