const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const connection = mongoose.connection;

connection.on('connected', () => {
    console.log('MongoDB connection successful');
});

connection.on('error', (error) => {
    console.log('MongoDB connection failed', error);
});

module.exports = mongoose;