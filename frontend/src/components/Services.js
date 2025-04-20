import React from 'react';
import './Services.css'; // We're adding a custom CSS file

const Services = () => {
  return (
    <div className="services-section">
      <h2 className="services-title">Our Wedding Packages</h2>
      <div className="card-container">
        <div className="card">
          <h3>Wedding Gold Package</h3>
          <p className="price">$2500</p>
          <ul>
            <li>6 hours of coverage</li>
            <li>300+ edited photos</li>
            <li>Cinematic highlight video</li>
            <li>Live streaming for one event</li>
          </ul>
        </div>
        <div className="card">
          <h3>Wedding Diamond Package</h3>
          <p className="price">$4800</p>
          <ul>
            <li>12 hours of coverage</li>
            <li>700+ edited photos</li>
            <li>Cinematic highlight video</li>
            <li>Full event video</li>
            <li>Live streaming for one event</li>
          </ul>
        </div>
        <div className="card">
          <h3>Wedding Platinum Package</h3>
          <p className="price">$7500</p>
          <ul>
            <li>20 hours of coverage</li>
            <li>1000+ edited photos</li>
            <li>Cinematic highlight video</li>
            <li>Full event video</li>
            <li>Live streaming for two events</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Services;
