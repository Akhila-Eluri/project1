const express = require('express');
const router = express.Router();
const Review = require('../models/reviewSchema');

// POST a new review
router.post('/reviews', async (req, res) => {
  try {
    const { name, email, rating, message } = req.body;

    // Validate if the required fields exist
    if (!name || !email || !rating || !message) {
      return res.status(400).json({ success: false, error: 'All fields are required' });
    }

    const newReview = new Review({ name, email, rating, message });
    await newReview.save();

    res.status(201).json({ success: true, message: 'Review submitted successfully!' });
  } catch (error) {
    console.error('Error saving review:', error);
    res.status(500).json({ success: false, error: 'Failed to save review' });
  }
});

// Fetch all reviews
router.get('/reviews', async (req, res) => {
  try {
    const reviews = await Review.find();
    res.status(200).json(reviews);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch reviews' });
  }
});

module.exports = router;
