const hallModel = require('../models/hallModel');
const cloudinary = require('../config/cloudinary');
const fs = require('fs');

exports.createHall = async (req, res, next) => {
    const files = req.files;

  const  cleanupLocalFiles=(files)=> {
  for (const file of files) {
    if (fs.existsSync(file.path)) {
      fs.unlinkSync(file.path);
    }
  }
}

  try {
    const { hallname, description, location, capacity, price, type, amenities } = req.body;

    if (!files || files.length === 0) {
      return res.status(400).json({ message: "At least one image is required" });
    }

   


    const uploadedImages = [];

    for (const file of files) {
      const cloudImage = await cloudinary.uploader.upload(file.path, {
        folder: 'Event/hall',
        use_filename: true,
        transformation: [
          { width: 500, height: 250, crop: "fill", gravity: "auto" }
        ]
      });

      uploadedImages.push({
        url: cloudImage.secure_url,
        publicId: cloudImage.public_id
      });

      // Delete local file
      if (fs.existsSync(file.path)) {
        fs.unlinkSync(file.path);
      }
    }

    const newhall = new hallModel({
      hallownerId: req.user._id,
      hallname,
      description,
      location,
      capacity,
      price, 
      type,
      amenities,
      image: uploadedImages
    });

    await newhall.save();

    res.status(201).json({
      message: 'Hall uploaded successfully',
      data: newhall
    });

  } catch (error) {
    // Cleanup local files on error
    if (files && Array.isArray(files)) {
      cleanupLocalFiles(files);
    }
    next(error);
  }
};

// Helper function to clean up all uploaded files

