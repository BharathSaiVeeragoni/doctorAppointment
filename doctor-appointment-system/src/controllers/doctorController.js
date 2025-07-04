const Doctor = require('../models/doctor');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Register a new doctor
exports.registerDoctor = async (req, res) => {
    const { name, email, password,specialisation } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newDoctor = new Doctor({ name, email, password: hashedPassword, specialisation });
        await newDoctor.save();
        res.status(201).json({ message: 'Doctor registered successfully', doctor: newDoctor });
    } catch (error) {
        res.status(500).json({ message: 'Error registering doctor', error });
    }
};

// Login for doctor 
exports.loginDoctor = async (req, res) => {
    const { email, password } = req.body;

    try {
        const doctor = await Doctor.findOne({ email });
        if (!doctor) {
            return res.status(404).json({ message: 'Doctor not found' });
        }

        const isMatch = await bcrypt.compare(password, doctor.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error });
    }
};

// Get all doctors
exports.getAllDoctors = async (req, res) => {
    try {
        const doctors = await Doctor.find();
        res.status(200).json(doctors);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching doctors', error });
    }
};

// Update doctor specialization and available slots
exports.updateDoctor = async (req, res) => {
    const { id } = req.params;
    const { specialization, availableSlots } = req.body;

    try {
        const updatedDoctor = await Doctor.findByIdAndUpdate(id, { specialization, availableSlots }, { new: true });
        if (!updatedDoctor) {
            return res.status(404).json({ message: 'Doctor not found' });
        }
        res.status(200).json({ message: 'Doctor updated successfully', doctor: updatedDoctor });
    } catch (error) {
        res.status(500).json({ message: 'Error updating doctor', error });
    }
};

// Get doctor by ID
exports.getDoctorById = async (req, res) => {
    const { id } = req.params;

    try {
        const doctor = await Doctor.findById(id);
        if (!doctor) {
            return res.status(404).json({ message: 'Doctor not found' });
        }
        res.status(200).json(doctor);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching doctor', error });
    }
};