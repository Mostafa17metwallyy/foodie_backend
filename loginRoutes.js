const express = require('express');
const router = express.Router();
const credentials = require('../data/credintial'); 

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Check if the provided username and password match the credentials
  if (username === credentials.username && password === credentials.password) {
    res.json({ success: true, message: 'Login successful' });
  } else {
    res.status(401).json({ success: false, message: 'Invalid username or password' });
  }
});

module.exports = router;
