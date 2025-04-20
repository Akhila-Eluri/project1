import React, { useState, useEffect } from 'react';
import './BookingForm.css';

const BookingForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    package: '',
    message: ''
  });

  const [services, setServices] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  // Fetch services from backend
  useEffect(() => {
    fetch('http://localhost:4000/api/services')
      .then(res => res.json())
      .then(data => setServices(data))
      .catch(err => console.error('Error fetching services:', err));
  }, []);

  const handleChange = (e) => {
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('http://localhost:4000/api/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });

    if (response.ok) {
      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        date: '',
        package: '',
        message: ''
      });
    }
  };

  return (
    <div className="booking-form-container">
      <h2>Book Your Event</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        <input type="tel" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} required />
        <input type="date" name="date" value={formData.date} onChange={handleChange} required />

        {/* Dropdown for Wedding Packages */}
        <select name="package" value={formData.package} onChange={handleChange} required>
          <option value="">Select a Wedding Package</option>
          {services.map((service, index) => (
            <option key={index} value={service.name}>{service.name}</option>
          ))}
        </select>

        <textarea name="message" placeholder="Additional Message" value={formData.message} onChange={handleChange} />

        <button type="submit">Submit Booking</button>
      </form>

      {/* Thank You Message */}
      {submitted && (
        <p className="thank-you-message">
          Thanks for Booking Hclicks! We will contact you with the quotation for your event.
        </p>
      )}
    </div>
  );
};

export default BookingForm;
