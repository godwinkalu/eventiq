const express = require('express')
const { createHallbooking, getMyBookings, getOwnerBookings } = require('../controller/hallbookingcontroller')
const { individualProtect ,hallProtect} = require('../middleware/authMiddleware')
const router = express.Router()

router.post('/booking/:hallId',individualProtect, createHallbooking)
router.get('/mybooking', individualProtect, getMyBookings)
router.get('/ownerbooking',hallProtect, getOwnerBookings)

module.exports = router