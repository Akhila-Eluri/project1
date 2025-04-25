const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const bookingRoutes = require('./routes/bookingRoutes');
const reviewRoutes = require('./routes/reviewRoutes'); // Make sure the path is correct

const app = express();
const PORT = 4000;
const userRoutes = require('./routes/users');
const adminRoutes = require('./routes/admins');


// ===== Middleware =====
app.use(cors()); // Handles CORS (Cross-Origin Resource Sharing)
app.use(express.json()); // Parses incoming requests with JSON payloads

// ===== MongoDB Connection =====
mongoose.connect('mongodb+srv://AkhilaEluri:AProjectdb@photoappcluster.ttpi4hy.mongodb.net/?retryWrites=true&w=majority&appName=photoAppCluster')
  .then(() => {
    console.log('✅ Connected to MongoDB');
  })
  .catch((error) => {
    console.error('❌ MongoDB connection error:', error);
  });

// ===== API Routes =====
app.use('/api/bookings', bookingRoutes); // Route for booking-related actions
app.use('/api', reviewRoutes); // Review routes (corrected prefix)
app.use('/api/users', userRoutes);
app.use('/api/admins', adminRoutes);


app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
