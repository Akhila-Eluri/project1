import React from 'react';
import './Footer.css'; // Assuming you have a CSS file for styling

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-logo">
        <img src="/images/logo.jpg" alt="Hclicks Logo" className="footer-logo-image" />
      </div>
      <div className="footer-links">
        <ul>
          <li><a href="/contact">Contact Us</a></li>
        </ul>
      </div>
      <div className="footer-contact">
        <p>Phone: +1(773)658-9786</p>
        <p>Email: hclicksss@gmail.com</p>
        <p>Instagram: <a href="https://instagram.com/hclicks">hclicks.official</a></p>
      </div>
      <div className="footer-copyright">
        <p>&copy; 2025 Hclicks Studio. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
