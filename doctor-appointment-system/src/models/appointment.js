const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
  patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
  slot: { type: String, required: true }, // ISO date string
  status: { type: String, enum: ['Booked', 'Confirmed', 'Cancelled'], default: 'Booked' }
}, { timestamps: true });

module.exports = mongoose.model('Appointment', appointmentSchema);