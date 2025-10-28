const router = require('express').Router()
const { createVenue, uploadCac, uploadDocument, getAllVenues, getOnevenue, updateVenue, deleteVenue } = require('../controller/venueController')
const { authentication } = require('../middleware/authMiddleware')

const upload = require('../middleware/multer')

router.post('/list-venue', authentication, upload.array('image', 5), createVenue)
router.post('/uploadCAC', authentication, upload.single('cac'), uploadCac)
router.post("/upload", authentication, upload.single('document'), uploadDocument)
router.get('/all', getAllVenues);
router.get('/getOneVenue/:id', getOnevenue);
router.put('/updatedvenue/:id', authentication, updateVenue);
router.delete('/deletevenue/:id', authentication, deleteVenue);


module.exports = router;