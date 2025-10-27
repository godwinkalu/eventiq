const { signUp } = require("../controller/clientController")

const router = require('express').Router()

router.post('/register-client', signUp)

module.exports = router
