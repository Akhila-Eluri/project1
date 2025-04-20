// models/Service.js
import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  duration: String,
  features: [String],
  price: Number
});

const Service = mongoose.model('Service', serviceSchema);

export default Service;
