const hallownerModel = require('../models/hallownerModel')
const cloudinary = require('../config/cloudinary')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const emailSender = require('../middleware/nodemalier')
const { signUpTemplate } = require('../utils/emailTemplate')

exports.signUp = async (req, res, next) => {
  const { firstName, surname, businessName, email, password, phoneNumber } = req.body
  try {
    const hallOwner = await hallownerModel.findOne({ email: email.toLowerCase() })
    if (hallOwner) {
      return res.status(404).json({
        message: 'hallOwner already exists, log in to your account',
      })
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const otp = Math.round(Math.random() * 1e6)
      .toString()
      .padStart(6, '0')

    const response = await cloudinary.uploader.upload('https://pixabay.com/vectors/blank-profile-picture-mystery-man-973460/')

    const newhallOwner = new hallownerModel({
      firstName,
      surname,
      businessName,
      email,
      phoneNumber,
      password: hashedPassword,
      otp: otp,
      otpExpiredat: Date.now() + 1000 * 60,
      profilePicture: {
        url: response.secure_url,
        publicId: response.public_id
      }
    })
    const savedhallOwner = await newhallOwner.save()

    if (`${req.protocol}://${req.get('host')}`.startsWith('http://localhost')) {
      console.log('passed');
      
      const emailOptions = {
        email: newhallOwner.email,
        subject: 'Verify Email',
        html: signUpTemplate(otp, newhallOwner.firstName),
      }

      emailSender(emailOptions)
    } else {
    }

    await newhallOwner.save()
    res.status(201).json({
      message: 'hallOwner created successfully',
      data: savedhallOwner,
    })
  } catch (error) {
    next(error)
  }
}
