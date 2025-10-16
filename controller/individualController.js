const individualModel = require('../models/individualModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cloudinary = require('../config/cloudinary')
const { signUpTemplate } = require('../utils/emailTemplate')
const { emailSender } = require('../middleware/nodemalier')



exports.signUp = async (req, res, next) => {
  const { firstName, surname, phoneNumber, email, password } = req.body
  try {
    const individual = await individualModel.findOne({ email: email.toLowerCase() })

    if (individual) {
      return res.status(404).json({
        message: 'Account already exists, log in to your account',
      })
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const otp = Math.round(Math.random() * 1e6)
      .toString()
      .padStart(6, '0')

    const imgUrl =
      'https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=1024x1024&w=is&k=20&c=oGqYHhfkz_ifeE6-dID6aM7bLz38C6vQTy1YcbgZfx8=';

    const response = await cloudinary.uploader.upload(imgUrl)

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
        publicId: response.public_id,
      },
    })

    if (`${req.protocol}://${req.get('host')}`.startsWith('http://localhost')) {
      const emailOptions = {
        email: newindividual.email,
        subject: 'Sign up successful',
        html: signUpTemplate(otp, newindividual.firstName),
      }
    await emailSender(emailOptions)
    } else {
    } 
     await newindividual.save()

    return res.status(201).json({
      message: 'individual created successfully',
      data: newindividual,
    })
  } catch (error) {
    next(error)
  }
}
