const router = require('express').Router()
const {
  verify,
  resendOtp,
  changePassword,
  forgotPassword,
  resetPassword,
  loginhallOwner,
} = require('../controller/hallownerController')
const { authentication } = require('../middleware/authMiddleware')
router.post('/hallowner/verify/:token', verify)
router.post('/hallowner/resendOtp', resendOtp)
router.post('/hallowner/login', loginhallOwner)
router.post('/hallowner/changePassword', authentication, changePassword)
router.post('/hallowner/forgotPassword', forgotPassword)
router.post('/hallowner/resetPassword/:token', resetPassword)


module.exports = router