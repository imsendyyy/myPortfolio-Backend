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
    try {
        const { name, title, bio, contactEmail, location, github, linkedin, personalWebsite, education } = req.body;

        // Parse the 'education' field if it is a string
        const parsedEducation = typeof education === 'string' ? JSON.parse(education) : education;  

        const profileImage = req.files?.profileImage?.[0]?.path;
        const resume = req.files?.resume?.[0]?.path;

        let userInfo = await User.findOne();

        if (userInfo) {
            // Updating existing user info
            userInfo = await User.findByIdAndUpdate(
                userInfo._id,
                { name, title, bio, contactEmail, location, github, linkedin, personalWebsite, education: parsedEducation, profileImage, resume },
                { new: true }
            );
        } else {
            // Creating a new user info entry
            userInfo = new User({
                name,
                title,
                bio,
                contactEmail,
                location,
                github, linkedin, personalWebsite,
                education: parsedEducation,
                profileImage,
                resume
            });
            await userInfo.save();
        }

        res.status(200).json(userInfo);
    } catch (error) {
        console.error("Error while updating User Info:", error);
        res.status(500).json({ error: 'Server error while updating User Info' });
    }
};




module.exports = { getUserInfo, upsertUserInfo}
