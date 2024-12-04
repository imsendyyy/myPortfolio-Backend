const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth")
const upload = require("../middleware/upload")
const { getAllBlogs, addNewBlog, updateBlog, deleteBlog } = require("../controllers/blogsController");


router.get('/getAllBlogs', getAllBlogs);
router.post('/addNewBlog', auth ,upload.single('coverImage'), addNewBlog);
router.put('/updateBlog/:id', auth, upload.single('coverImage'), updateBlog);
router.delete('/deleteBlog/:id', auth, deleteBlog);


module.exports = router;