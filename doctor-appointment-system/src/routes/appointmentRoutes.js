const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController');
const authMiddleware = require('../middleware/authMiddleware');

// Route to create a new appointment
router.post('/', authMiddleware.verifyToken, appointmentController.createAppointment);

// Route to view all appointments for a patient
router.get('/patient/:patientId', authMiddleware.verifyToken, appointmentController.getPatientAppointments);

// Route to confirm an appointment by a doctor
router.put('/confirm/:appointmentId', authMiddleware.verifyToken, appointmentController.confirmAppointment);

// Route to cancel an appointment by a patient
router.delete('/:appointmentId', authMiddleware.verifyToken, appointmentController.cancelAppointment);

module.exports = router;