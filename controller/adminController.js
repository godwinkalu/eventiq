const adminModel = require('../models/adminModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const emailSender = require('../middleware/nodemalier')


exports.signUp = async (req,res, next) =>{
  const {firstName,surname,phoneNumber,email,password,} = req.body
  try {
    const admin = await adminModel.findOne({email:email.toLowerCase()})
    if (admin) {
      return res.status(404).json({
        message:'admin  already exists, log in to your account'
      })
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const otp = Math.round(Math.random() * 1e6)
    .toString()
    .padStart(6, '0');

    const response = await cloudinary.uploader.upload('https://pixabay.com/vectors/blank-profile-picture-mystery-man-973460/')
    

    const newadmin = new individualModel({
      firstName,
      surname,
      phoneNumber,
      email,
      password: hashedPassword,
      otp: otp,
      otpExpiredat: Date.now() + 1000 * 60,
       profilePicture: {
        url: response.secure_url,
        publicId: response.public_id
      }
    })
    const savedadmin = await newadmin.save()

   
    const emailOptions = {
      email: newadmin.email,
      subject: 'sign up successful',
      html: signUpTemplate(otp,admin.firstName),
    }

    emailSender(emailOptions)

    return res.status(201).json({
      message:'admin created successfully',
      data: savedadmin
    })
  } catch (error) {
    next(error)
  }
}