const router = require('express').Router();
const auth = require('../controller/auth');

const {verifyToken } = require('../middleware');

router.post('/signup',auth.signup);
router.post('/login',auth.signin);

router.post("/verify", auth.verifyPhoneOtp);
router.post('/logout', verifyToken, auth.signout);


module.exports = router;