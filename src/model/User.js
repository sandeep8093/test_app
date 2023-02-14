const mongoose = require('mongoose');
const userSchema = mongoose.Schema(
  {
    phone: {
        type: String,
        required: true,
        trim: true,
        unique: true,
      },
    name: { type: String, required: true},
    verified: {
        type: Boolean,
        default: false
      },
    phoneOtp:String,
    jwttoken:String,
    _profile: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User_Profile',
        default: null
      },
   
  },
  { timestamps: true },
  { minimize: false }
);

module.exports = mongoose.model('User', userSchema);