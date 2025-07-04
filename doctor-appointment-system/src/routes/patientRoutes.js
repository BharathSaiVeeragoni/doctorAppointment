const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientController');
const authMiddleware = require('../middleware/authMiddleware');

// Route for patient registration
router.post('/patient/register', patientController.registerPatient);

// Route for patient login
router.post('/patient/login', patientController.loginPatient);

// Route for viewing appointments
router.get('/patient/appointments', authMiddleware.verifyToken, patientController.viewAppointments);

// Route for canceling an appointment
router.delete('/patient/appointments/:id', authMiddleware.verifyToken, patientController.cancelAppointment);

module.exports = router;