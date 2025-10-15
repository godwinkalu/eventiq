const { signUp } = require("../controller/individualController")

const router = require('express').Router()

router.post('/individual', signUp)

module.exports = router
