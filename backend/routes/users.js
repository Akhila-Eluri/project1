const express = require('express');
const User = require('../models/User');
const router = express.Router();

// POST route to add a new user
router.post('/add', async (req, res) => {
  const { name, email, phone } = req.body;
  try {
    const newUser = new User({ name, email, phone });
    await newUser.save();  // Save to MongoDB
    res.status(201).json({ message: 'User added successfully!' });
  } catch (err) {
    res.status(500).json({ error: 'Error adding user: ' + err.message });
  }
});

module.exports = router;
