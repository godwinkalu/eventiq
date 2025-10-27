const mongoose = require('mongoose')

const clientSchema = new mongoose.Schema(
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
      enum:['client',  'admin'],
      default: 'client', 
    },
  },
  { timestamps: true }
)

const clientModel = mongoose.model('clients', clientSchema)

module.exports = clientModel
