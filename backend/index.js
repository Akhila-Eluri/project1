const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bookingRoutes = require('./routes/bookingRoutes');
const serviceRoutes = require('./routes/serviceRoutes'); // ✅ NEW

const app = express();
const PORT = 4000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb+srv://AkhilaEluri:AProjectdb@photoappcluster.ttpi4hy.mongodb.net/?retryWrites=true&w=majority&appName=photoAppCluster')
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });

// Test route
app.get('/test', (req, res) => {
  console.log("GET /test route hit!");
  res.send('Test route working!');
});

// Routes
app.use('/api/bookings', bookingRoutes);
app.use('/api/services', serviceRoutes); // ✅ NEW

// Start server
console.log("Routes are registered!");
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
