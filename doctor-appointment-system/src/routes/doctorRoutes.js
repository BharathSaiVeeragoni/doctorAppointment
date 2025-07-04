const express = require('express');
const router = express.Router();
const doctorController = require('../controllers/doctorController');
const authMiddleware = require('../middleware/authMiddleware');

// Route for doctor registration
router.post('/doctor/register', doctorController.registerDoctor);

// Route for doctor login
router.post('/doctor/login', doctorController.loginDoctor);

// Route to get doctor profile
router.get('/:id', authMiddleware.verifyToken, doctorController.getDoctorById);

// Route to update doctor profile
router.put('/:id', authMiddleware.verifyToken, doctorController.updateDoctor);

// Route to add available slots
router.post('/:id/slots', authMiddleware.verifyToken, doctorController.addAvailableSlots);

// Route to get available slots
router.get('/:id/slots', authMiddleware.verifyToken, doctorController.getAvailableSlots);

module.exports = router;