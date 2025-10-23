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
      
    },
    otpExpiredat: {
      type: Number,
      
    },
    hallId:{
      type:mongoose.Schema.Types.ObjectId,
          ref:'hallOwners',
          required:true  
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
   role: {
      type: String,
      enum:[ 'hallOwners', 'admin'],
      default: 'hallOwners',
    },
  },
  { timestamps: true }
)

const hallOwnerModel = mongoose.model('hallOwners', hallOwnerSchema)

module.exports = hallOwnerModel
