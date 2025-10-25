const venueModel = require('../models/venueModel')
const venueOwnerModel = require('../models/venueOwnerModel')
const cloudinary = require('../config/cloudinary')
const fs = require('fs')

exports.createVenue = async (req, res, next) => {
  const files = req.files || []

  const cleanupLocalFiles = (files) => {
    for (const file of files) {
      if (fs.existsSync(file.path)) {
        fs.unlinkSync(file.path)
      }
    }
  }

  try {
    const {
      name,
      description,
      capacity,
      price,
      type,
      amenities,
      cautionfee,
      openhours,
      street,
      city,
      state,
    } = req.body
    const id = req.user.id

    const venueOwner = await venueOwnerModel.findById(id)
    if (!venueOwner) {
      if (files && Array.isArray(files)) cleanupLocalFiles(files)
      return res.status(404).json({
        message: "Venue owner not found, can't create venue",
      })
    }

    const existingVenue = await venueModel.findOne({
      name: name?.trim(),
      'location.street': street?.trim(),
    })

    if (existingVenue) {
      if (files && Array.isArray(files)) cleanupLocalFiles(files)
      return res.status(400).json({
        message: 'Venue already exists in this city',
      })
    }
    const location = {
      street: street ? street.trim() : '',
      city: city ? city.trim() : '',
      state: state ? state.trim() : '',
    }

    if (!files.length) {
      return res.status(400).json({ message: 'At least one image is required' })
    }

    const uploadedImages = []
    for (const file of files) {
      const cloudImage = await cloudinary.uploader.upload(file.path, {
        folder: 'Event/Venues',
        use_filename: true,
        transformation: [{ width: 500, height: 250, crop: 'fill', gravity: 'auto' }],
      })

      uploadedImages.push({
        url: cloudImage.secure_url,
        publicId: cloudImage.public_id,
      })

      fs.existsSync(file.path) && fs.unlinkSync(file.path)
    }

    const newVenue = new venueModel({
      venueOwnerId: venueOwner._id,
      name: name?.trim(),
      description,
      location,
      capacity,
      price,
      cautionfee,
      openhours,
      type,
      amenities,
      image: uploadedImages,
    })

    await newVenue.save()

    res.status(201).json({
      message: 'Venue uploaded successfully ',
      data: newVenue,
    })
  } catch (error) {
    if (files && Array.isArray(files)) cleanupLocalFiles(files)
    next(error)
  }
}

exports.uploadCac = async (req, res, next) => {
  const file = req.file

  try {
    const { id } = req.user
    const venueOwner = await venueOwnerModel.findById(id)
    const venue = await venueModel.findOne({ venueOwnerId: venueOwner._id })

    if (!venueOwner) {
      fs.unlinkSync(file.path)
      return res.status(404).json({
        message: 'Venue owner not found',
      })
    }

    if (!venue) {
      fs.unlinkSync(file.path)
      return res.status(404).json({
        message: 'Venue not found',
      })
    }
    if (!file) {
      fs.unlinkSync(file.path)
      return res.status(400).json({ message: 'Please upload your CAC to continue' })
    }

    const response = await cloudinary.uploader.upload(file.path)
    fs.unlinkSync(file.path)

    const result = {
      url: response.secure_url,
      publicId: response.public_id,
    }

    venue.cac = result
    await venue.save()
    res.status(201).json({
      message: 'CAC uploaded successfully ',
    })
  } catch (error) {
    fs.unlinkSync(file.path)
    next(error)
  }
}

exports.uploadDocument = async (req, res, next) => {
  const file = req.file

  try {
    const { id } = req.user
    const venueOwner = await venueOwnerModel.findById(id)
    const venue = await venueModel.findOne({ venueOwnerId: venueOwner._id })

    if (!venueOwner) {
      fs.unlinkSync(file.path)
      return res.status(404).json({
        message: 'Venue owner not found',
      })
    }

    if (!venue) {
      fs.unlinkSync(file.path)
      return res.status(404).json({
        message: 'Venue not found',
      })
    }
    if (!file) {
      fs.unlinkSync(file.path)
      return res.status(400).json({ message: 'Please upload your Document to continue' })
    }

    const response = await cloudinary.uploader.upload(file.path)
    fs.unlinkSync(file.path)

    const result = {
      url: response.secure_url,
      publicId: response.public_id,
    }

    venue.document = result
    venue.status = 'pending'
    await venue.save()
    res.status(201).json({
      message: 'Document uploaded successfully ',
    })
  } catch (error) {
    fs.unlinkSync(file.path)
    next(error)
  }
}
