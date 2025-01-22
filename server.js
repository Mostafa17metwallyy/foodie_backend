require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const loginRoutes = require('./routes/loginRoutes');
const menuRoutes = require('./routes/menuRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const contactRoutes = require('./routes/contactRoutes');
const adminRoutes = require('./routes/adminRoutes'); // Add this line to include admin routes

const app = express();

// Middleware
app.use(cors({
  origin: ["https://deploy-mern-1whq.vercel.app"],
  methods: ["POST", "GET"],
  credentials: true
}));
app.use(express.json());

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('Successfully connected to MongoDB.');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
  });

// Error handling for MongoDB connection
mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected');
});

// Routes
app.use('/api', loginRoutes);
app.use('/api', menuRoutes);
app.use('/api', bookingRoutes);
app.use('/api', contactRoutes);
app.use('/api/admin', adminRoutes); // Register the admin routes here

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!'
  });
});

// Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
