const hallownerModel = require('../models/hallownerModel')
const individualModel = require('../models/individualModel')
const adminModel = require('../models/adminModel')

exports.verify = async (req, res, next) => {
  const { email, otp } = req.body

  try {
    const user =
      (await hallownerModel.findOne({ email: email.toLowerCase() })) ||
      (await individualModel.findOne({ email: email.toLowerCase() })) 
    if (!user) {
      return res.status(404).json({
        message: 'User not found',
      })
    }
    if (Date.now() > user.otpExpiredat) {
      return res.status(400).json({
        message: 'Otp expired',
      })
    }

    if (otp !== user.otp) {
      return res.status(404).json({
        message: 'Incorrect Otp',
      })
    }

    if (user.isVerified) {
      return res.status(400).json({
        message: 'User already verified, please proceed to login',
      })
    }

    Object.assign(user, {
      isVerified: true,
      otp: null,
      otpExpiredat: null,
    })
    await user.save()
    res.status(404).json({
      message: 'User verified Successfully',
    })
  } catch (error) {
    next(error)
  }
}

exports.resendOtp = async (req, res, next) => {
  const { email } = req.body

  try {
    const user= await hallownerModel.findOne({ email: email.toLowerCase() }) || await individualModel.findOne({email:email.toLowerCase()})
    if (!user) {
      return res.status(404).json({
        message: 'user not found',
      })
    }

    const newOtp = Math.floor(1000 + Math.random() * 1e6)
      .toString()
      .padStart(6, '0')
    user.otp = newOtp
    user.otpExpiredat = Date.now() + 2 * 60 * 1000

    await user.save()

    if (`${req.protocol}://${req.get('host')}`.startsWith('http://localhost')) {
      const emailOptions = {
        email: user.email,
        subject: 'Verify Email',
        html: signUpTemplate(otp, user.firstName),
      }

      emailSender(emailOptions)
    } else {
    }

    res.status(200).json({
      message: 'OTP resent successfully',
    })
  } catch (error) {
    next(error)
  }
}

exports.login = async (req, res, next) => {
  const { email, password } = req.body
  if (!email) {
    return res.status(400).json({
      message: 'Email required',
    })
  }
  if (!password) {
    return res.status(400).json({
      message: 'password required',
    })
  }
  try {
    const user =
      (await hallownerModel.findOne({ email: email.toLowerCase() })) ||
      (await individualModel.findOne({ email: email.toLowerCase() })) ||
      (await adminModel.findOne({ email: email.toLowerCase() }))
    if (!user) {
      return res.status(404).json({
        message: 'user not found',
      })
    }

    const checkPassword = await bcrypt.compare(password, user.password)
    if (!checkPassword) {
      return res.status(400).json({
        message: 'Incorrect password',
      })
    }

    const token = jwt.sign({ id: user._id, email: user.email, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '1hr',
    })

    res.status(200).json({
      message: 'Login successfully',
      token: token,
    })

    // a mail could be sent showing that the user has logged in at the current time
  } catch (error) {
    next(error)
  }
}

exports.changePassword = async (req, res, next) => {
  const { id } = req.user
  const { oldPassword, newPassword, confirmPassword } = req.body

  try {
    const user =
      (await hallownerModel.findById(id)) ||
      (await individualModel.findById(id)) ||
      (await adminModel.findById(id))
    if (!user) {
      return res.status(404).json({
        message: 'user not found',
      })
    }

    const checkOldPassword = await bcrypt.compare(oldPassword, user.password)
    if (!checkOldPassword) {
      return res.status(400).json({
        message: 'Oldpassword Incorrect',
      })
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        message: 'newPassword mismatch',
      })
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(newPassword, salt)

    user.password = hashedPassword
    await user.save()

    return res.status(200).json({
      message: 'Password changed successfully',
    })
  } catch (error) {
    next(error)
  }
}

exports.forgotPassword = async (req, res, next) => {
  const { email } = req.body
  try {
    const user = await hallownerModel.findOne({ email: email.toLowerCase() })
    if (!user) {
      return res.status(404).json({
        message: 'User not found',
      })
    }

    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: '20m',
    })

    const link = `${req.protocol}://${req.get('host')}/users/reset/password/${token}`

    const emailOptions = {
      email: user.email,
      subject: 'Reset password',
      html: forgotPasswordTemplate(link, user.firstName),
    }

    emailSender(emailOptions)

    return res.status(200).json({
      message: 'forgot password request sent',
    })
  } catch (error) {
    next(error)
  }
}

exports.resetPassword = async (req, res, next) => {
  const { token } = req.params
  const { newPassword, confirmPassword } = req.body

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    const user = await hallownerModel.findById(decoded.id)
    if (!user) {
      return res.status(404).json({
        message: 'user not found',
      })
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        message: 'Password mismatch',
      })
    }
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(newPassword, salt)

    const tokenExpiry = Date.now() + 5 * 60 * 1000

    if (Date.now() > tokenExpiry) {
      return res.status(400).json({
        message: 'Password expired, resend a password',
      })
    }

    user.password = hashedPassword
    user.resetPasswordExpiriedAt = tokenExpiry

    await user.save()

    return res.status(404).json({
      message: 'Password reset successfully',
    })
  } catch (error) {
    next(error)
  }
}
