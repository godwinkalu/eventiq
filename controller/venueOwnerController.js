const venueOwnerModel = require('../models/venueOwnerModel')
const cloudinary = require('../config/cloudinary')
const bcrypt = require('bcrypt')
const { signUpTemplate } = require('../utils/emailTemplate')
const { emailSender } = require('../middleware/nodemalier')
const Brevo = require('@getbrevo/brevo')

exports.createVenueOwner = async (req, res, next) => {
  const { firstName, surname, businessName, email, password, phoneNumber } = req.body
  try {
    const existVenueOwner = await venueOwnerModel.findOne({ email: email.toLowerCase() })

    if (existVenueOwner) {
      return res.status(404).json({
        message: 'Account already exists, login your account',
      })
    }
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const otp = Math.round(Math.random() * 1e6)
      .toString()
      .padStart(6, '0')

    const imgUrl =
      'https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=1024x1024&w=is&k=20&c=oGqYHhfkz_ifeE6-dID6aM7bLz38C6vQTy1YcbgZfx8='

    const response = await cloudinary.uploader.upload(imgUrl)

    const venueOwner = new venueOwnerModel({
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
        publicId: response.public_id,
      },
    })

    const apikey = process.env.brevo
    const apiInstance = new Brevo.TransactionalEmailsApi()
    apiInstance.setApiKey(Brevo.TransactionalEmailsApiApiKeys.apiKey, apikey)

    const sendSmtpEmail = new Brevo.SendSmtpEmail()
    sendSmtpEmail.subject = 'Welcome to Eventiq'
    sendSmtpEmail.to = [{ email: venueOwner.email }]
    sendSmtpEmail.sender = { name: 'Eventiq', email: 'udumag51@gmail.com' }

    sendSmtpEmail.htmlContent = signUpTemplate(otp, venueOwner.firstName)
    console.log(firstName)

    const data = await apiInstance.sendTransacEmail(sendSmtpEmail)
    await venueOwner.save()

    await venueOwner.save()
    res.status(201).json({
      message: 'venueOwner created successfully',
      data: venueOwner,
    })
  } catch (error) {
    next(error)
  }
}
