const mongoose = require('mongoose');

const SkillSchema = new mongoose.Schema({
    name : { type : String, require : true, unique : true},
    description : { type : String},
    category : { type : String},
    proficiency : { type : String, enum: ['Beginner', 'Intermediate', 'Advanced', 'Expert'], default: 'Beginner',},
    imageUrl : { type : String}
})


module.exports = mongoose.model('Skill', SkillSchema);