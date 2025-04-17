import React, { useState } from "react";
import "./BookingForm.css";

const BookingForm = () => {
  const [formData, setFormData] = useState({
    clientName: "",
    email: "",
    phone: "",
    eventType: "",
    eventDate: "",
    location: "",
    message: ""
  });

  const [submitted, setSubmitted] = useState(false);
  const [emailQuery, setEmailQuery] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [userBookings, setUserBookings] = useState([]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setFormData({
      clientName: "",
      email: "",
      phone: "",
      eventType: "",
      eventDate: "",
      location: "",
      message: ""
    });
    setIsEditing(false);
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEditing) {
      // Update flow
      try {
        const response = await fetch(`http://localhost:4000/api/bookings/${editingId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(formData)
        });
        if (response.ok) {
          alert("Booking updated successfully!");
          resetForm();
          setUserBookings([]);
        } else {
          alert("Failed to update booking.");
        }
      } catch (error) {
        console.error("Error updating booking", error);
      }
    } else {
      // New submission
      try {
        await fetch("http://localhost:4000/api/bookings", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(formData)
        });
        setSubmitted(true);
        resetForm();
        setTimeout(() => setSubmitted(false), 3000);
      } catch (error) {
        console.error("Error submitting form", error);
      }
    }
  };

  const handleFetchBookings = async () => {
    try {
      const response = await fetch(`http://localhost:4000/api/bookings/email/${emailQuery}`);
      const bookings = await response.json();

      if (!bookings || bookings.length === 0) {
        alert("No bookings found for that email.");
        setUserBookings([]);
        return;
      }

      setUserBookings(bookings);
    } catch (err) {
      console.error("Error fetching bookings", err);
      alert("Something went wrong while fetching bookings");
    }
  };

  const loadBookingIntoForm = (booking) => {
    setFormData({
      clientName: booking.clientName,
      email: booking.email,
      phone: booking.phone,
      eventType: booking.eventType,
      eventDate: booking.eventDate.slice(0, 10),
      location: booking.location,
      message: booking.message
    });
    setEditingId(booking._id);
    setIsEditing(true);
  };

  const handleCancelBooking = async (id) => {
    const confirmCancel = window.confirm("Are you sure you want to cancel this booking?");
    if (!confirmCancel) return;

    try {
      const response = await fetch(`http://localhost:4000/api/bookings/${id}`, {
        method: "DELETE"
      });

      if (response.ok) {
        alert("Booking cancelled successfully.");
        setUserBookings(userBookings.filter(b => b._id !== id));
        resetForm();
      } else {
        alert("Failed to cancel booking.");
      }
    } catch (error) {
      console.error("Error cancelling booking", error);
      alert("Something went wrong while cancelling booking");
    }
  };

  return (
    <div className="booking-section">
      <h2>Book Your Session</h2>
      <form onSubmit={handleSubmit} className="booking-form">
        <input type="text" name="clientName" placeholder="Client Name" value={formData.clientName} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        <input type="text" name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} required />
        <input type="text" name="eventType" placeholder="Event Type" value={formData.eventType} onChange={handleChange} required />
        <input type="date" name="eventDate" value={formData.eventDate} onChange={handleChange} required />
        <input type="text" name="location" placeholder="Location" value={formData.location} onChange={handleChange} required />
        <textarea name="message" placeholder="Message" value={formData.message} onChange={handleChange}></textarea>
        <button type="submit" className={submitted ? "submitted" : ""}>
          {isEditing ? "Update Booking" : submitted ? "Submitted!" : "Submit Booking"}
        </button>
      </form>

      {/* Manage Booking Section */}
      <div className="manage-booking">
        <h3>Manage Your Bookings</h3>
        <input
          type="email"
          placeholder="Enter your email to find bookings"
          value={emailQuery}
          onChange={(e) => setEmailQuery(e.target.value)}
        />
        <button onClick={handleFetchBookings}>Fetch My Bookings</button>

        {userBookings.length > 0 && (
          <div className="user-booking-list">
            <h4>Your Bookings:</h4>
            {userBookings.map((booking) => (
              <div key={booking._id} className="booking-item">
                <p><strong>Event:</strong> {booking.eventType}</p>
                <p><strong>Date:</strong> {booking.eventDate.slice(0, 10)}</p>
                <div className="booking-actions">
                  <button onClick={() => loadBookingIntoForm(booking)}>Edit</button>
                  <button onClick={() => handleCancelBooking(booking._id)}>Cancel</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingForm;
