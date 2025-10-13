const express = require('express')
const {
  signUp
} = require('../controller/individualController')
const { authentication } = require('../middleware/authMiddleware')
const router = express.Router()

router.post('/client', signUp)

module.exports = router
