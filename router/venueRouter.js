const router = require('express').Router()
const { createVenue, uploadCac, uploadDocument } = require('../controller/venueController')
const { authentication } = require('../middleware/authMiddleware')
// const { hallProtect } = require('../middleware/authMiddleware')
const upload = require('../middleware/multer')

router.post('/list-venue', authentication, upload.array('image', 5), createVenue)
router.post('/uploadCAC', authentication, upload.single('cac'), uploadCac)
router.post("/upload", authentication, upload.single('document'), uploadDocument)

module.exports = router;