// models/Service.js
const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  duration: String,
  features: [String],
  price: Number
});

const Service = mongoose.model('Service', serviceSchema);

module.exports = Service;
