const Profile = require('../model/Profile');
const User=require('../model/User');

exports.addAndUpdateProfile = async (req, res) => {
  try{
  let user = await User.findOne({ _id: req.user.id });
  if (user._profile != null) {
    await Profile.findOneAndUpdate(
        { _id: user._profile },
        req.body
      );
      return res.status(200).json({ message: 'updated profile' });
  } else {
    let profileModel = new Profile(req.body);
    user._profile= profileModel._id;
    await profileModel.save();
    await user.save();
    return res.status(200).json({ message: 'profile added' });
  }
}catch (err) {
    res.status(500).json(err);
  }
};

exports.getProfile = async (req, res) => {
    try{
    let user = await User.findOne({ _id: req.user.id });
    const reqProfile=await Profile.findOne({ _id: user._profile });
    res.status(201).json({
        data: {
          reqProfile
        }
      });
  }catch (err) {
      res.status(500).json(err);
    }
  };