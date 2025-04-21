import React, { useState, useEffect } from "react";
import "./BookingForm.css";

const BookingForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    eventType: "",
    eventDate: "",
    location: "",
    message: "",
    package: ""
  });

  const [submitted, setSubmitted] = useState(false);
  const [emailQuery, setEmailQuery] = useState("");
  const [bookings, setBookings] = useState([]);
  const [selectedBookingId, setSelectedBookingId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      eventType: "",
      eventDate: "",
      location: "",
      message: "",
      package: ""
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      eventType: formData.eventType,
      eventDate: formData.eventDate,
      location: formData.location,
      message: formData.message,
      package: formData.package
    };

    try {
      const response = await fetch("http://localhost:4000/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        setSubmitted(true);
        resetForm();
        setTimeout(() => setSubmitted(false), 3000);
      } else {
        alert("Failed to submit booking.");
      }
    } catch (error) {
      console.error("Error submitting form", error);
      alert("Something went wrong.");
    }
  };

  const handleFetchBooking = async () => {
    try {
      const response = await fetch(`http://localhost:4000/api/bookings/email/${emailQuery}`);
      const data = await response.json();

      if (!data || data.length === 0) {
        alert("No bookings found with that email.");
        return;
      }

      setBookings(data);
    } catch (err) {
      console.error("Error fetching bookings", err);
      alert("Something went wrong while fetching bookings.");
    }
  };

  const handleSelectBooking = (booking) => {
    setSelectedBookingId(booking._id);
    setFormData({
      name: booking.name,
      email: booking.email,
      phone: booking.phone,
      eventType: booking.eventType,
      eventDate: booking.eventDate.slice(0, 10),
      location: booking.location,
      message: booking.message,
      package: booking.package
    });
    setIsEditing(true);
  };

  const handleConfirmUpdate = async () => {
    const updatedData = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      eventType: formData.eventType,
      eventDate: formData.eventDate,
      location: formData.location,
      message: formData.message,
      package: formData.package
    };

    try {
      const response = await fetch(`http://localhost:4000/api/bookings/${selectedBookingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData)
      });

      if (response.ok) {
        alert("Booking updated successfully!");
        resetForm();
        setIsEditing(false);
        setSelectedBookingId(null);
        setBookings([]);
        setEmailQuery("");
      } else {
        alert("Failed to update booking.");
      }
    } catch (error) {
      console.error("Error updating booking", error);
    }
  };

  const handleCancelBooking = async () => {
    if (!selectedBookingId) {
      alert("Please select a booking to cancel.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:4000/api/bookings/${selectedBookingId}`, {
        method: "DELETE"
      });

      if (response.ok) {
        alert("Booking cancelled successfully.");
        resetForm();
        setIsEditing(false);
        setSelectedBookingId(null);
        setBookings([]);
        setEmailQuery("");
      } else {
        alert("Failed to cancel booking.");
      }
    } catch (error) {
      console.error("Error cancelling booking", error);
    }
  };

  return (
    <div className="booking-section">
      <h2>Book Your Session</h2>
      <form onSubmit={handleSubmit} className="booking-form">
        <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        <input type="text" name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} required />
        <input type="text" name="eventType" placeholder="Event Type" value={formData.eventType} onChange={handleChange} required />
        <input type="date" name="eventDate" value={formData.eventDate} onChange={handleChange} required />
        <input type="text" name="location" placeholder="Location" value={formData.location} onChange={handleChange} required />
        <textarea name="message" placeholder="Message" value={formData.message} onChange={handleChange}></textarea>
        <select name="package" value={formData.package} onChange={handleChange} required>
          <option value="">Select Package</option>
          <option value="Gold">Gold</option>
          <option value="Diamond">Diamond</option>
          <option value="Platinum">Platinum</option>
        </select>
        <button type="submit" className={submitted ? "submitted" : ""}>
          {submitted ? "Submitted!" : "Submit Booking"}
        </button>
      </form>

      {/* Manage Booking Section */}
      <div className="manage-booking">
        <h3>Manage Booking</h3>
        <input
          type="email"
          placeholder="Enter your email to find bookings"
          value={emailQuery}
          onChange={(e) => setEmailQuery(e.target.value)}
        />
        <div className="booking-actions">
          <button onClick={handleFetchBooking}>Find My Bookings</button>
        </div>

        {bookings.length > 0 && (
          <div className="booking-list">
            <h4>Select a Booking to Edit or Cancel:</h4>
            {bookings.map((b) => (
              <div
                key={b._id}
                className={`booking-item ${selectedBookingId === b._id ? "selected" : ""}`}
                onClick={() => handleSelectBooking(b)}
              >
                {b.eventType} on {b.eventDate.slice(0, 10)} at {b.location}
              </div>
            ))}
            {isEditing && (
              <div className="edit-controls">
                <button onClick={handleConfirmUpdate}>Confirm Update</button>
                <button onClick={handleCancelBooking}>Cancel Booking</button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingForm;
