const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name : { type : String, required : true},
    title : { type : String, required : true},
    bio : { type : String, required : true},
    profileImage : { type : String, required : true},
    contactEmail : { type : String, required : true},
    location : { type : String},
    resume : { type : String},
    socialLinks: {
        github: { type: String },
        linkedin: { type: String },
        personalWebsite: { type: String },
    },
    education: [
        {
            degree: { type: String, required: true },
            institution: { type: String, required: true },
            startDate: { type: Date },
            endDate: { type: Date },
            description: { type: String },
        },
    ],
},{ timestamps: true });

module.exports = mongoose.model('User', UserSchema)