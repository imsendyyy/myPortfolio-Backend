const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: String, default: "Anonymous" },
    tags: { type: [String] }, 
    published: { type: Boolean, default: false },
    publishedAt: { type: Date },
    coverImage: { type: String },
    createdAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model("Blogs", BlogSchema);