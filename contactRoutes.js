const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

router.post('/contact', async (req, res) => {
  try {
    if (!req.body.email) {
      return res.status(400).json({
        success: false,
        message: 'Email is required'
      });
    }

    const contact = new Contact({
      email: req.body.email
    });

    const newContact = await contact.save();
    
    // Send a simple JSON response
    return res.status(201).json({
      success: true,
      message: 'Contact saved successfully'
    });

  } catch (error) {
    console.error('Contact save error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

module.exports = router; 