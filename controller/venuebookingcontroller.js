const clientModel = require('../models/clientModel');
const venuebookingModel = require('../models/venuebookingModel');
const venueModel = require('../models/venueModel');

exports.createvenuebooking = async (req, res, next) => {
  try {
    const { date, notes, numberofguests } = req.body;
    const { venueId } = req.params;
    const clientId = req.user.id;

    const venue = await venueModel.findById(venueId);
    const client = await clientModel.findById(clientId);
    
    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }
    
    if (client.role !== 'client') {
      return res.status(400).json({ message: 'Only client can book for venue' });
    }
    
    if (!venue) {
      return res.status(404).json({ message: 'Venue not found' });
    }

    // Check if venue is already booked on that date
    const existingBooking = await venuebookingModel.findOne({clientId:client._id, venueId: venue._id, paymentstatus: 'paid',bookingstatus: 'pending'});

    if (existingBooking) {
      return res.status(400).json({
        message: 'Venue is already booked for the selected date by this user'
      });
    }

    // Calculate total cost
    const basePrice = venue.price;
    const serviceCharge = +(0.10 * basePrice).toFixed(2);
    const totalAmount = basePrice + serviceCharge;

    //  Create booking
    const newBooking = new venuebookingModel({
      venueId,
      clientId,
      venueOwnerId: venue.venueOwnerId,
      date,
      totalamount: totalAmount,
      servicecharge: serviceCharge,
      notes,
      numberofguests
    });

    await newBooking.save();

    return res.status(201).json({
      message: 'Venue booked successfully',
      data: newBooking
    });

  } catch (error) {
    console.error("Booking Error:", error);
    next(error);
  }
};

exports.getMyBookings = async (req, res, next) => {
  try {
    const clientId = req.user.id;

    const bookings = await venuebookingModel.find({ clientId })
      .populate('venueId', 'name location capacity') 
      .populate('clientId', 'name email'); 

    return res.status(200).json({
      message: 'Your bookings retrieved successfully',
      data: bookings
    });
  } catch (error) {
    next(error);
  }
};
exports.getOwnerBookings = async (req, res, next) => {
  try {
    const venueOwner = req.user.id;

    const bookings = await venuebookingModel.find({ venueId: venueOwner })
      .populate('venueId')
      .populate('clientId', 'name email');

    return res.status(200).json({
      message: 'Your bookings retrieved successfully',
      data: bookings
    });
  } catch (error) {
    next(error);
  }
};
exports.approve = async (req, res) => {
        try {
            const htmlApproved = require("../utils/confirm.html"); // Assuming this is the correct file with the HTML template function
            const htmlRejected = require("../utils/reject.html"); // Separate HTML for rejection
            const sendMail = require("../utils/nodemailer");
            const checkUser = await clientModel.findById(req.params.id);
            const link = https
    
            if (!checkUser) {
                return res.status(404).json({ message:' User not found '});
            }
    
            const { status, reasons } = req.body;
            if (!status) {
                return res.status(400).json({message:' Status of the user not provided'});
            }
    
            if (status === 'approved') {
                await sendMail({
                    subject: 'Account Approved',
                    email: checkUser.email,
                    html: htmlApproved(link, checkUser.firstName) // Assuming this is a function that generates the email
                });
                const checkManager = await clientModel.findById(req.user);
    
                await clientModel.findByIdAndUpdate(req.params.id, { isApproved: true, accountApprovedBy: checkManager.firstName});
    
                return res.status(200).json(`${checkUser.firstName}'s account has been approved by ${checkManager.firstName}`);
            }
    
            if (status === 'rejected') {
                if (!reasons) {
                    return res.status(400).json({ message: "Kindly provide reasons for rejection" });
                }
                if (reasons.length < 6) {
                    return res.status(400).json({ message: "Kindly expand on your reasons for rejection" });
                }
                await sendMail({
                    subject: 'Profile Rejected',
                    email: checkUser.email,
                    html: htmlRejected(reasons, checkUser.firstName) // Assuming this is a function for the rejection email
                });
    
                // Delete the user's pictures from Cloudinary
                const { profilePicture, identification } = checkUser;
                if (profilePicture && profilePicture.publicId) {
                    await cloudinary.uploader.destroy(profilePicture.publicId);
                }
                if (identification && identification.publicId) {
                    await cloudinary.uploader.destroy(identification.publicId);
                }
    
                await clientModel.findByIdAndDelete(req.params.id);
                return res.status(200).json(`${checkUser.fullName}'s account has been deleted`);
            }
    
            return res.status(400).json({ message: 'Invalid status value' });
    
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };
