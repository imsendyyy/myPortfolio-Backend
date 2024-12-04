const User = require('../models/User');


// Get User's Details 
const getUserInfo = async(req, res) => {
    try {
        const userInfo = await User.findOne();
        if(!userInfo){
            return res.status(404).json({ error : "User Info Not Found Plase Create User Info"})
        }

        res.status(200).json(userInfo);
    } catch (error) {
        res.status(500).json({ error: 'Server error while fetching User Info' });
    }
}


// Add or Update User Info 
const upsertUserInfo = async (req, res) => {
    const { name, title, bio, contactEmail, location, socialLinks, education } = req.body;

    try {
        // Extract file URLs from Cloudinary upload
        const profileImage = req.files?.profileImage?.[0]?.path; // Get profileImage URL
        const resume = req.files?.resume?.[0]?.path; // Get resume URL

        let userInfo = await User.findOne(); // Find the existing user info

        if (userInfo) {
            // Update the existing User Info
            userInfo = await User.findByIdAndUpdate(
                userInfo._id,
                { name, title, bio, contactEmail, location, socialLinks, education, profileImage, resume },
                { new: true }
            );

            return res.status(200).json({ message: 'User Info updated successfully', userInfo });
        } else {
            // Create new User Info
            userInfo = new User({
                name,
                title,
                bio,
                contactEmail,
                location,
                socialLinks,
                education,
                profileImage,
                resume
            });

            await userInfo.save(); // Save the new User Info
            return res.status(200).json({ message: 'User Info created successfully', userInfo });
        }
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ error: 'Server error while updating User Info' });
    }
};



module.exports = { getUserInfo, upsertUserInfo}