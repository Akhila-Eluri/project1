// routes/serviceRoutes.js
const express = require('express');
const Service = require('../models/Service');

const router = express.Router();

// Get all services
router.get('/', async (req, res) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch services' });
  }
});

module.exports = router;
