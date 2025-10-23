const hallbookingModel =  require('../models/hallbookingModel')
const hallModel = require('../models/hallModel')
exports.createHallbooking = async (req, res, next) => {
  try {
    const { Date: bookingDate, notes, numberofguests } = req.body;
    const { hallId } = req.params;
    const individualId = req.user.id;

    // Validate incoming date
    if (!bookingDate || isNaN(new Date(bookingDate).getTime())) {
      return res.status(400).json({ message: 'Invalid or missing booking date.' });
    }

    const selectedDate = new Date(bookingDate);
    selectedDate.setHours(0, 0, 0, 0); // normalize

    const hall = await hallModel.findById(hallId);
    console.log(hall);
    
    if (!hall) {
      return res.status(404).json({ message: 'Hall not found' });
    }

    const existingBooking = await hallbookingModel.findOne({
      hallId,
      Date: selectedDate,
      bookingstatus: { $in: ['pending', 'confirmed'] }
    });

    if (existingBooking) {
      return res.status(400).json({
        message: 'Hall is already booked for the selected date'
      });
    }

    const basePrice = hall.price;
    const serviceCharge = +(0.10 * basePrice).toFixed(2);
    const totalAmount = basePrice + serviceCharge;

    const newBooking = new hallbookingModel({
      hallId,
      individualId,
      hallOwnerId: hall.hallownerId,
      Date: selectedDate,
      totalamount: totalAmount,
      servicecharge: serviceCharge,
      notes,
      numberofguests
    });




    await newBooking.save();

    res.status(201).json({
      message: 'Hall booked successfully',
      data: newBooking
    });

  } catch (error) {
    next(error);
  }
};

exports.getMyBookings = async (req, res, next) => {
  try {
    const individual = req.user.id;

    const bookings = await hallbookingModel.find({ individualId: individual })
      .populate('hallId');

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
    const hallOwner = req.user.id;

    const bookings = await hallbookingModel.find({ hallOwnerId: hallOwner })
      .populate('hallId')
      .populate('individualId', 'name email');

    return res.status(200).json({
      message: 'Your bookings retrieved successfully',
      data: bookings
    });
  } catch (error) {
    next(error);
  }
};

