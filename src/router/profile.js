const router = require('express').Router();
const profile = require('../controller/profile');

const {verifyToken } = require('../middleware');

router.get('/get-profile', verifyToken, profile.getProfile);
router.post('/profile', verifyToken, profile.addAndUpdateProfile);

module.exports = router;