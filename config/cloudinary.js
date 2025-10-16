const cloudinary = require('cloudinary').v2
require('dotenv').config()

// cloudinary.config({
//   CLOUDINARY_NAME: process.env.CLOUDINARY_NAME,
//   API_KEY: process.env.API_KEY,
//   API_SECRET: process.env.API_SECRET,
// })


cloudinary.config({
  cloud_name :  process.env.CLOUDINARY_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
})
module.exports = cloudinary
