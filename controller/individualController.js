const individualModel = require('../models/individualModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const emailSender = require('../middleware/nodemalier')


exports.signUp = async (req,res, next) =>{
  const {firstName,surname,phoneNumber,email,password,role} = req.body
  try {
    const individual = await individualModel.findOne({email:email.toLowerCase()})
    if (!individual) {
      return res.status(404).json({
        message:'individual  already exists, log in to your account'
      })
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const otp = Math.round(Math.random() * 1e6)
    .toString()
    .padStart(6, '0')

    const response = await cloudinary.uploader.upload('https://pixabay.com/vectors/blank-profile-picture-mystery-man-973460/')
    

    const newindividual = new individualModel({
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
    const savedindividual = await newindividual.save()

   
    const emailOptions = {
      email: newindividual.email,
      subject: 'sign up successful',
      html: signUpTemplate(otp,individual.firstName),
    }

    emailSender(emailOptions)

    return res.status(201).json({
      message:'individual created successfully',
      data: savedindividual
    })
  } catch (error) {
    next(error)
  }
}