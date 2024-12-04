const mongoose = require("mongoose");

const TestimonialSchema = new mongoose.Schema({
    name : { type : String, required : true},
    feedback : { type : String, required : true},
    company : { type : String},
    designation : { type : String, required : true},
    imageUrl : { type : String},
    rating: {
        type: Number,
        min: 1,
        max: 5,
        default: 5,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Testimonial', TestimonialSchema);
