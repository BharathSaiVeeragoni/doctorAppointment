# Doctor Appointment System

This is a Node.js application for managing doctor appointments. The application allows patients to register, log in, view available doctors, book appointments, and cancel bookings. Doctors can register, log in, manage their profiles, and confirm appointments.

## Features

- **User Authentication**: Both doctors and patients can register and log in.
- **Doctor Management**: Doctors can manage their profiles, including specialization and available slots.
- **Appointment Management**: Patients can view available appointments, book slots, and cancel bookings. Doctors can confirm appointments.
- **Database**: The application uses MongoDB for data storage, managed through Mongoose.

## Project Structure

```
doctor-appointment-system
├── src
│   ├── config
│   │   └── dbconfig.js
│   ├── controllers
│   │   ├── appointmentController.js
│   │   ├── authController.js
│   │   ├── doctorController.js
│   │   └── patientController.js
│   ├── middleware
│   │   └── authMiddleware.js
│   ├── models
│   │   ├── appointment.js
│   │   ├── doctor.js
│   │   └── patient.js
│   ├── routes
│   │   ├── appointmentRoutes.js
│   │   ├── authRoutes.js
│   │   ├── doctorRoutes.js
│   │   └── patientRoutes.js
│   ├── utils
│   │   └── token.js
│   └── app.js
├── package.json
└── README.md
```

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```
   cd doctor-appointment-system
   ```

3. Install the dependencies:
   ```
   npm install
   ```

4. Set up your MongoDB connection string in an environment variable named `MONGODB_URL`.

5. Start the application:
   ```
   npm start
   ```

## API Endpoints

- **Authentication**
  - `POST /api/auth/register` - Register a new user (doctor or patient)
  - `POST /api/auth/login` - Log in a user

- **Doctors**
  - `GET /api/doctors` - Get a list of all doctors
  - `GET /api/doctors/:id` - Get details of a specific doctor
  - `PUT /api/doctors/:id` - Update doctor profile

- **Appointments**
  - `POST /api/appointments` - Book a new appointment
  - `GET /api/appointments` - View all appointments for a patient
  - `PUT /api/appointments/:id/confirm` - Confirm an appointment by a doctor
  - `DELETE /api/appointments/:id` - Cancel an appointment

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or features.

## License

This project is licensed under the MIT License.