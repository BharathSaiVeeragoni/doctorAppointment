const Appointment = require('../models/appointment');

// Create a new appointment
exports.createAppointment = async (req, res) => {
    try {
        const { date, time, patientId, doctorId } = req.body;
        const newAppointment = new Appointment({ date, time, patientId, doctorId, status: 'Pending' });
        await newAppointment.save();
        res.status(201).json({ message: 'Appointment created successfully', appointment: newAppointment });
    } catch (error) {
        res.status(500).json({ message: 'Error creating appointment', error });
    }
};

// View appointments for a patient
exports.viewAppointments = async (req, res) => {
    try {
        const patientId = req.params.patientId;
        const appointments = await Appointment.find({ patientId });
        res.status(200).json(appointments);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving appointments', error });
    }
};

// Confirm an appointment by a doctor
exports.confirmAppointment = async (req, res) => {
    try {
        const appointmentId = req.params.appointmentId;
        const appointment = await Appointment.findByIdAndUpdate(appointmentId, { status: 'Confirmed' }, { new: true });
        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }
        res.status(200).json({ message: 'Appointment confirmed', appointment });
    } catch (error) {
        res.status(500).json({ message: 'Error confirming appointment', error });
    }
};

// Cancel an appointment
exports.cancelAppointment = async (req, res) => {
    try {
        const appointmentId = req.params.appointmentId;
        const appointment = await Appointment.findByIdAndUpdate(appointmentId, { status: 'Cancelled' }, { new: true });
        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }
        res.status(200).json({ message: 'Appointment cancelled', appointment });
    } catch (error) {
        res.status(500).json({ message: 'Error cancelling appointment', error });
    }
};