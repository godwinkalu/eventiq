const express = require('express')
const { getMyBookings, getOwnerBookings, createvenuebooking,  } = require('../controller/venuebookingcontroller')
const {authentication} = require('../middleware/authMiddleware')
const router = express.Router()

router.post('/booking/:venueId',authentication, createvenuebooking)
router.get('/mybooking', authentication, getMyBookings)
router.get('/ownerbooking',authentication, getOwnerBookings)


module.exports = router