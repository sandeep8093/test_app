const User = require('../model/User');
const jwt = require('jsonwebtoken');
const otpverify=require('../middleware/otp')

exports.signup = async (req, res) => {
    let { phone, name } = req.body;
    try {

    // check duplicate phone Number
    const phoneExist = await User.findOne({ phone });
    if (phoneExist) {
        return res.status(400).json({ message: 'This Phone Number already Exists' });
    }
    // create new user
    const createUser = new User({
        phone,
        name,
      });
  
      // save user
      const user = await createUser.save();
  
      res.status(200).json({
        type: "success",
        message: "Account created OTP sended to mobile number",
        data: {
          userId: user._id,
        },
      });
  } catch (err) {
    res.status(500).json(err);
  }
}

exports.signin = async (req, res) => {
 try{
    const { phone } = req.body;
    const user = await User.findOne({ phone });
    if (!user) {
        return res.status(400).json({ message: 'This Phone Number does not Exists' });
    }
    res.status(201).json({
      type: "success",
      message: "OTP sended to your registered phone number",
      data: {
        userId: user._id,
      },
    });

    // generate otp
    const otp = otpverify.generateOTP(6);
    // save otp to user collection
    user.phoneOtp = otp;
    await user.save();
    // send otp to phone number
    await fast2sms(
      {
        message: `Your OTP is ${otp}`,
        contactNumber: user.phone,
      }
    );
} catch (err) {
    res.status(500).json(err);
  }
} 


exports.verifyPhoneOtp = async (req, res) => {
try {
    const { otp, userId } = req.body;
    const user = await User.findById(userId);
    if (!user) {
        return res.status(400).json({ message: 'This Phone Number does not Exists' });
    }

    if (user.phoneOtp !== otp) {
        return res.status(400).json({ message: 'Incorrect otp' });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: '2h',
      });

    user.phoneOtp = ""; 
    user.verified=true
    user.jwttoken=token
    await user.save();

    res.status(201).json({
      type: "success",
      message: "OTP verified successfully",
      data: {
        token,
        userId: user._id,
      },
    });
  } catch (error) {
    next(error);
  }
}
exports.signout = async (req, res) => {
    let currentUser = req.user;

    let user = await User.findOne({ _id: currentUser.id });
    user.jwttoken=''
    await user.save();
  res.status(200).json({ message: 'You have signed out successfully' });
};