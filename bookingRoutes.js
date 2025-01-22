const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');

// Create a new booking
router.post('/bookings', async (req, res) => {
  try {
    const booking = new Booking({
      date: new Date(req.body.date),
      time: req.body.time,
      guests: req.body.guests,
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      specialRequests: req.body.specialRequests
    });

    const newBooking = await booking.save();
    res.status(201).json(newBooking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all bookings (maybe for admin purposes)
router.get('/bookings', async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; 