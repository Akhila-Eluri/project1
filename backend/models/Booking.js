const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  clientName: {
    type: String,
    required: true
  },
  email: {
    type: String
  },
  phone: {
    type: String
  },
  eventType: {
    type: String
  },
  eventDate: {
    type: Date
  },
  location: {
    type: String
  },
  message: {
    type: String
  },
  status: {
    type: String,
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
