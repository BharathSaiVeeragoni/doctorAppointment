const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
// const authRoutes = require('./routes/authRoutes');
const doctorRoutes = require('./routes/doctorRoutes');
const patientRoutes = require('./routes/patientRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');
const dbConfig = require('./config/dbconfig');
const cors = require('cors');

app.use(cors({
  origin: 'http://localhost:3000', // React dev server
  credentials: true
}));

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.use('/api/auth', authRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api/patients', patientRoutes);
app.use('/api/appointments', appointmentRoutes);

app.get('/', (req, res) => {
    res.send('Welcome to the Doctor Appointment System API');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});