const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const bookingRoutes = require('./routes/bookingRoutes');
const serviceRoutes = require('./routes/serviceRoutes');

const app = express();
const PORT = 4000;

// ===== Middleware =====
app.use(cors()); // Handles CORS (Cross-Origin Resource Sharing)
app.use(express.json()); // Parses incoming requests with JSON payloads

// ===== MongoDB Connection =====
mongoose.connect('mongodb+srv://AkhilaEluri:AProjectdb@photoappcluster.ttpi4hy.mongodb.net/')
  .then(() => {
    console.log('✅ Connected to MongoDB');
  })
  .catch((error) => {
    console.error('❌ MongoDB connection error:', error);
  });

// ===== Test Route =====
app.get('/test', (req, res) => {
  console.log("GET /test route hit!");
  res.send('Test route working!');
});

// ===== API Routes =====
app.use('/api/bookings', bookingRoutes); // Route for booking-related actions
app.use('/api/services', serviceRoutes); // Route for services display and selection

// ===== Start Server =====
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
