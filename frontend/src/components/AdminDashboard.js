import React, { useEffect, useState } from "react";
import "./AdminDashboard.css";
import axiosInstance from '../util/axiosInstance';


const ADMIN_KEY = "hclicksadmin123"; // Replace with your own secret key

const AdminDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [authenticated, setAuthenticated] = useState(false);
  const [inputKey, setInputKey] = useState("");

  const fetchBookings = async () => {
    try {
      const response = await axiosInstance.get('/bookings'); // Automatically uses baseURL
      setBookings(response.data);
    } catch (error) {
      console.error("Error fetching bookings", error);
    }
  };


  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this booking?")) {
      try {
        await axiosInstance.delete(`/bookings/${id}`);
        setBookings(bookings.filter((booking) => booking._id !== id));
        alert("Booking deleted successfully.");
      } catch (error) {
        console.error("Error deleting booking", error);
        alert("Failed to delete booking.");
      }
    }
  };

  useEffect(() => {
    if (authenticated) {
      fetchBookings();
    }
  }, [authenticated]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (inputKey === ADMIN_KEY) {
      setAuthenticated(true);
    } else {
      alert("Incorrect admin key!");
    }
  };

  if (!authenticated) {
    return (
      <div className="admin-login">
        <h2>Admin Access</h2>
        <form onSubmit={handleLogin}>
          <input
            type="password"
            value={inputKey}
            onChange={(e) => setInputKey(e.target.value)}
            placeholder="Enter Admin Key"
            required
          />
          <button type="submit">Enter</button>
        </form>
      </div>
    );
  }

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
