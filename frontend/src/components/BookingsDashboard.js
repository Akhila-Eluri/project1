import React, { useEffect, useState } from 'react';

const BookingDashboard = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/bookings')
      .then((res) => res.json())
      .then((data) => setBookings(data))
      .catch((err) => console.error('Error fetching bookings:', err));
  }, []);

  return (
    <div style={{ padding: '2rem', backgroundColor: '#fff4f4' }}>
      <h2 style={{ marginBottom: '1rem', fontSize: '1.8rem', color: '#333' }}>
        Submitted Bookings
      </h2>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#fce1e1' }}>
              <th style={thStyle}>Name</th>
              <th style={thStyle}>Email</th>
              <th style={thStyle}>Phone</th>
              <th style={thStyle}>Event Type</th>
              <th style={thStyle}>Date</th>
              <th style={thStyle}>Details</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking._id}>
                <td style={tdStyle}>{booking.name}</td>
                <td style={tdStyle}>{booking.email}</td>
                <td style={tdStyle}>{booking.phone}</td>
                <td style={tdStyle}>{booking.eventType}</td>
                <td style={tdStyle}>{new Date(booking.eventDate).toLocaleDateString()}</td>
                <td style={tdStyle}>{booking.details}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const thStyle = {
  border: '1px solid #ddd',
  padding: '12px',
  fontWeight: 'bold',
  textAlign: 'left',
};

const tdStyle = {
  border: '1px solid #ddd',
  padding: '10px',
};

export default BookingDashboard;
