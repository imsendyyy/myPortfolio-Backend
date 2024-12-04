const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const Admin = require('../models/Admin')

const router = express.Router();


// Admin registration route
router.post('/register', async (req, res) => {
    const { username, password } = req.body;

    try {
        const existingAdmin = await Admin.findOne({ username });
        if (existingAdmin) {
            return res.status(400).json({ error: 'Admin already exists' });
        }

        // Create a new admin (password will be hashed by pre('save') middleware)
        const admin = new Admin({ username, password });
        await admin.save();

        res.status(201).json({ message: 'Admin created successfully' });
    } catch (error) {
        console.error('Error during admin registration:', error);
        res.status(500).json({ error: 'Server error' });
    }
});



// Admin Login Route
router.post('/login', async(req, res) => {
    const { username, password } = req.body ;

    try {
        const admin = await Admin.findOne({username});
        if(!admin) {
            return res.status(401).json({error: 'Invalid username'})
        }

        const isMatch = await bcrypt.compare(password, admin.password);
        if(!isMatch) {
            return res.status(401).json({ error : 'Invalid password'})
        }

        const token = jwt.sign({id: admin._id}, process.env.JWT_SECRET, {expiresIn: '1H'});
        res.json({token});
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
})

module.exports = router;
