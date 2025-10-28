const { createVenueOwner } = require("../controller/venueOwnerController")

const router = require('express').Router()

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

module.exports = router
