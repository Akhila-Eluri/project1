import React, { useEffect, useState } from "react";
import "./AdminDashboard.css";
import axiosInstance from '../util/axiosInstance';

export const AdminDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [authenticated, setAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [editing, setEditing] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    eventType: "",
    eventDate: "",
    location: "",
    message: "",
  });

  const fetchBookings = async () => {
    try {
      const response = await axiosInstance.get('/bookings');
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

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axiosInstance.post('/admins/login', {
        username,
        password,
      });

      if (res.status === 200) {
        setAuthenticated(true);
        setError("");
      }
    } catch (err) {
      setError("Invalid username or password.");
    }
  };

  const handleUpdate = (booking) => {
    setEditing(booking._id);
    setFormData({
      name: booking.name || "",
      email: booking.email || "",
      phone: booking.phone || "",
      eventType: booking.eventType || "",
      eventDate: booking.eventDate ? booking.eventDate.slice(0, 10) : "",
      location: booking.location || "",
      message: booking.message || "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmitUpdate = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.put(`/bookings/${editing}`, formData);

      // Update local state with the edited booking
      const updatedBookings = bookings.map((booking) =>
        booking._id === editing ? { ...booking, ...formData } : booking
      );

      console.log({
        updatedBookings
      })

      setBookings(updatedBookings);
      setEditing(null);
      alert("Booking updated successfully!");
    } catch (error) {
      console.error("Error updating booking", error);
      alert("Failed to update booking.");
    }
  };

  const cancelEdit = () => {
    setEditing(null);
  };

  if (!authenticated) {
    return (
      <div className="admin-login">
        <h2>Admin Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          <button type="submit">Login</button>
        </form>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard - All Bookings</h2>

      {editing && (
        <div className="edit-form">
          <h3>Edit Booking</h3>
          <form onSubmit={handleSubmitUpdate}>
            <div className="form-group">
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Phone:</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Event Type:</label>
              <input
                type="text"
                name="eventType"
                value={formData.eventType}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Date:</label>
              <input
                type="date"
                name="eventDate"
                value={formData.eventDate}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Location:</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Message:</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="4"
              ></textarea>
            </div>
            <div className="form-buttons">
              <button type="submit">Save Changes</button>
              <button type="button" onClick={cancelEdit}>Cancel</button>
            </div>
          </form>
        </div>
      )}

      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <div className="booking-list">
          {bookings.map((booking) => (
            <div key={booking._id} className="booking-card">
              <p><strong>Name:</strong> {booking.name}</p>
              <p><strong>Email:</strong> {booking.email}</p>
              <p><strong>Phone:</strong> {booking.phone}</p>
              <p><strong>Event:</strong> {booking.eventType}</p>
              <p><strong>Date:</strong> {booking.eventDate?.slice(0, 10)}</p>
              <p><strong>Location:</strong> {booking.location}</p>
              <p><strong>Message:</strong> {booking.message}</p>

              <button className="btn-delete" onClick={() => handleDelete(booking._id)}>Delete</button>
              <button className="btn-update" onClick={() => handleUpdate(booking)}>Update</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;