const Blogs = require("../models/Blogs");


// Get All Blogs
const getAllBlogs = async(req, res) => {
    try {
        const blogs = await Blogs.find();
        res.status(200).json(blogs);
    } catch (error) {
        res.status(500).json({ error : "Server Error While Getting All Blogs"})
    }
}


// Create new Blog
const addNewBlog = async (req, res) => {
    try {
        // Check if a file was uploaded
        let coverImageUrl = null;
        if (req.file) {
            coverImageUrl = req.file.path; // Cloudinary stores the file path in `req.file.path`
        }
         const tags = req.body.tags ? JSON.parse(req.body.tags) : [];

        // Create the new blog with the uploaded image URL if available
        const newBlog = new Blogs({
            ...req.body,
            tags,
            coverImage: coverImageUrl, // Save the image URL
        });

        // Save the blog in the database
        await newBlog.save();

        res.status(200).json({ message: "New Blog Created Successfully", blog: newBlog });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server Error While Creating New Blog" });
    }
};

//Update Exsiting Blog
const updateBlog = async (req, res) => {
    const { id } = req.params;
    const { title, content, author, published, publishedAt } = req.body;

    try {
        // Check if a new cover image file is uploaded
        let updatedFields = { title, content, author, published, publishedAt };
        // Parse `tags` if provided
        if (req.body.tags) {
            updatedFields.tags = JSON.parse(req.body.tags);
        }
        if (req.file) {
            updatedFields.coverImage = req.file.path; // New coverImage URL from Cloudinary
        }

        // Update the blog with new fields
        const updatedBlog = await Blogs.findByIdAndUpdate(id, updatedFields, { new: true });

        if (!updatedBlog) {
            return res.status(404).json({ error: "Blog not found" });
        }

        res.status(200).json({ message: "Blog updated successfully", blog: updatedBlog });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error while updating blog" });
    }
};



// Delete Blog
const deleteBlog = async(req, res) => {
    const { id } = req.params;
    try {
        const blog = await Blogs.findByIdAndDelete(id)
        if(!blog){
            return res.status(404).json({ error : " Blog not Found"})
        }

        res.status(200).json({ message : "Blog Deleted Successfully"})
    } catch (error) {
        res.status(500).json({ error : "Server Error While Deleting Blog"})
    }
}

module.exports = {getAllBlogs, addNewBlog, updateBlog, deleteBlog}
