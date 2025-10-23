const mongoose = require('mongoose')

const individualSchema = new mongoose.Schema(
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
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    phoneNumber: {
      type: String,
      required: true,
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
      
    },
    otpExpiredat: {
      type: Number,
    
    },
    isVerified: {
      type: Boolean,
      default: false,
    },

    role: {
      type: String,
      enum:['individual',  'admin'],
      default: 'individual', 
    },
  },
  { timestamps: true }
)

const individualModel = mongoose.model('individuals', individualSchema)

module.exports = individualModel
