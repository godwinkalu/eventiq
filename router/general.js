const router = require('express').Router()
const { verify, resendOtp, login, changePassword, forgotPassword, resetPassword } = require('../controller/general')
const { authentication } = require('../middleware/authMiddleware')

router.post('/verify', verify)
router.post('/resendOtp', resendOtp)
router.post('/login', login)
router.post('/changePassword', authentication,changePassword)
router.post('/forgotPassword', forgotPassword)
router.post('/resetPassword', resetPassword)

module.exports = router