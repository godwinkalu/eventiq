const router = require('express').Router()
const { createHall } = require('../controller/hallController')
const { hallProtect } = require('../middleware/authMiddleware')
const upload = require('../middleware/multer')

router.post('/hall',hallProtect,upload.array('image') ,createHall)

module.exports = router