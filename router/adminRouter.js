const router = require('express').Router()

const { signUp } = require('../controller/adminController')

router.post("/admin", signUp)

module.exports = router