const express = require('express')
const {
  getMyBookings,
  getAllPendingBookings,
  createvenuebooking,
  getAllConfirmedBookings,
} = require('../controller/venuebookingcontroller')
const { authentication } = require('../middleware/authMiddleware')
const router = express.Router()

router.post('/booking/:venueId', authentication, createvenuebooking)
router.get('/mybooking', authentication, getMyBookings)
router.get('/pendingbooking', authentication, getAllPendingBookings)
router.get('/confirmedbooking', authentication, getAllConfirmedBookings)

module.exports = router
