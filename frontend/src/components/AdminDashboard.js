import React, { useEffect, useState } from "react";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/bookings");
      const data = await response.json();
      setBookings(data);
    } catch (error) {
      console.error("Error fetching bookings", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this booking?")) {
      try {
        const response = await fetch(`http://localhost:4000/api/bookings/${id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          setBookings(bookings.filter((booking) => booking._id !== id));
          alert("Booking deleted successfully.");
        } else {
          alert("Failed to delete booking.");
        }
      } catch (error) {
        console.error("Error deleting booking", error);
      }
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard - All Bookings</h2>
      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <div className="booking-list">
          {bookings.map((booking) => (
            <div key={booking._id} className="booking-card">
              <p><strong>Name:</strong> {booking.clientName}</p>
              <p><strong>Email:</strong> {booking.email}</p>
              <p><strong>Phone:</strong> {booking.phone}</p>
              <p><strong>Event:</strong> {booking.eventType}</p>
              <p><strong>Date:</strong> {booking.eventDate?.slice(0, 10)}</p>
              <p><strong>Location:</strong> {booking.location}</p>
              <p><strong>Message:</strong> {booking.message}</p>
              <button onClick={() => handleDelete(booking._id)}>Delete</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
