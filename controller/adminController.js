const adminModel = require('../models/adminModel')
const bcrypt = require('bcrypt')
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

    
    .toString()
    .padStart(6, '0');

    const response = await cloudinary.uploader.upload('https://pixabay.com/vectors/blank-profile-picture-mystery-man-973460/')
    

    const newadmin = new adminModel({
      firstName,
      surname,
      phoneNumber,
      email,
      password: hashedPassword,
       profilePicture: {
        url: response.secure_url,
        publicId: response.public_id
      }
    })
   await newadmin.save()

   
    return res.status(201).json({
      message:'admin created successfully',
      data: newadmin
    })
  } catch (error) {
    next(error)
  }
}