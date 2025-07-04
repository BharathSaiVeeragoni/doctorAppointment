const Patient = require('../models/patient');
const Appointment = require('../models/appointment');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Register a new patient
exports.registerPatient = async (req, res) => {
    const { name, email, password} = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newPatient = new Patient({ name, email, password: hashedPassword});
        await newPatient.save();
        res.status(201).json({ message: 'Patient registered successfully', patient: newPatient });
    } catch (error) {
        res.status(500).json({ message: 'Error registering patient', error });
    }
};

// Login for  patient
exports.loginPatient = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await Patient.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'Patient not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error });
    }
};


// View appointments for a patient
exports.viewAppointments = async (req, res) => {
    try {
        const patientId = req.params.id;
        const appointments = await Appointment.find({ patientId });
        res.status(200).json(appointments);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching appointments', error });
    }
};

// Cancel a slot booking
exports.cancelAppointment = async (req, res) => {
    try {
        const appointmentId = req.params.id;
        const appointment = await Appointment.findByIdAndDelete(appointmentId);
        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }
        res.status(200).json({ message: 'Appointment canceled successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error canceling appointment', error });
    }
};