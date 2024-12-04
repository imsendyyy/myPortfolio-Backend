const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const uploadMultiple = require('../middleware/uploadMultiple')
const { getUserInfo, upsertUserInfo } = require('../controllers/userController')


router.get('/getUserInfo', getUserInfo);
router.put('/createOrUpdateUserInfo', auth, uploadMultiple, upsertUserInfo);

module.exports = router;