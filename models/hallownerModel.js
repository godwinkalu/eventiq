const mongoose = require('mongoose')

const hallOwnerSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    surname: {
      type: String,
      required: true,
      trim: true,
    },
    businessName: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true
    },
    phoneNumber: {
      type: String,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    profilePicture: {
      url: {
        type: String,
      },
      publicId: {
        type: String,
      },
    },
    otp: {
      type: String,
      required: true,
    },
    otpExpiredat: {
      type: String,
      required: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isLoggedIn: {
      type: Boolean,
      default: false,
    },
   role: {
      type: String,
      default: 'hallOwners',
    },
  },
  { timestamps: true }
)

const hallOwnerModel = mongoose.model('hallOwners', hallOwnerSchema)

module.exports = hallOwnerModel
