const { createVenueOwner, getAllVenueOwners, getVenueOwner, getVenueOwners, updateVenueOwner, deleteVenueOwner } = require("../controller/venueOwnerController")

const router = require('express').Router()
const upload = require('../middleware/multer')

/**
 * @swagger
 *  /venueOwner:
 *   post:
 *     summary: Register a new venue owner
 *     description: Creates a new venue owner account and sends a verification OTP to the provided email.
 *     tags:
 *       - venue Owners
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - surname
 *               - businessName
 *               - email
 *               - password
 *               - phoneNumber
 *             properties:
 *               firstName:
 *                 type: string
 *                 description: The hall owner's first name
 *                 example: Godwin
 *               surname:
 *                 type: string
 *                 description: The hall owner's surname
 *                 example: Uduma
 *               businessName:
 *                 type: string
 *                 description: The name of the hall owner's business
 *                 example: Royal Event Center
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The hall owner's email address
 *                 example: kalugodwin158@gmail.com
 *               password:
 *                 type: string
 *                 format: password
 *                 description: The hall owner's password
 *                 example: MySecurePass123
 *               phoneNumber:
 *                 type: string
 *                 description: The hall owner's phone number
 *                 example: 09056345749
 *     responses:
 *       201:
 *         description: Hall owner created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: hallOwner created successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: The hall owner's ID
 *                       example: 83e3a1fe8d9ab7ff15abac23
 *                     firstName:
 *                       type: string
 *                       example: Godwin
 *                     surname:
 *                       type: string
 *                       example: Uduma
 *                     businessName:
 *                       type: string
 *                       example: Royal Event Center
 *                     email:
 *                       type: string
 *                       example: kalugodwin158@gmail.com
 *                     phoneNumber:
 *                       type: string
 *                       example: 09056345749
 *       404:
 *         description: Hall owner already exists
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: hallOwner already exists, log in to your account
 *       500:
 *         description: Server error
 */
router.post('/venueOwner', createVenueOwner)

/**
 * @swagger
 * /venueowners:
 *   get:
 *     summary: Get all venue owners
 *     tags: [VenueOwner]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all venue owners retrieved successfully
 *       500:
 *         description: Server error
 */
router.get('/getallvenue',  getAllVenueOwners);

/**
 * @swagger
 * /venueowners/{id}:
 *   get:
 *     summary: Get a single venue owner by ID
 *     tags: [VenueOwner]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Venue owner ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Venue owner retrieved successfully
 *       404:
 *         description: Venue owner not found
 */
router.get('/getvenue/:id',  getVenueOwners);

/**
 * @swagger
 * /venueowners/{id}:
 *   patch:
 *     summary: Update a venue owner
 *     tags: [VenueOwner]
 *     security:
 *       - bearerAuth: []
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Venue owner ID
 *         schema:
 *           type: string
 *       - in: formData
 *         name: profilePicture
 *         type: file
 *         description: Upload new profile picture
 *       - in: formData
 *         name: firstName
 *         type: string
 *       - in: formData
 *         name: surname
 *         type: string
 *       - in: formData
 *         name: businessName
 *         type: string
 *       - in: formData
 *         name: phoneNumber
 *         type: string
 *     responses:
 *       200:
 *         description: Venue owner updated successfully
 *       404:
 *         description: Venue owner not found
 */
router.put('/updateVenue/:id', upload.single('profilePicture'), updateVenueOwner);

/**
 * @swagger
 * /venueowners/{id}:
 *   delete:
 *     summary: Delete a venue owner
 *     tags: [VenueOwner]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Venue owner ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Venue owner deleted successfully
 *       404:
 *         description: Venue owner not found
 */
router.delete('/delete/:id',  deleteVenueOwner);
module.exports = router
