import React, { useState, useEffect } from 'react';
import './Footer.css';
import { useNavigate } from 'react-router-dom'; // ✅ NEW IMPORT

const Footer = () => {
  const [showAdminDashboard, setShowAdminDashboard] = useState(false);
  const navigate = useNavigate(); // ✅ INITIATE NAVIGATION

  useEffect(() => {
    const isAdmin = localStorage.getItem('isAdmin');
    if (isAdmin === 'true') {
      setShowAdminDashboard(true);
    }
  }, []);

  const handleAdminAccess = () => {
    const adminKey = prompt('Enter Admin Key:');
    if (adminKey === 'hclicksadmin123') {
      localStorage.setItem('isAdmin', 'true');
      setShowAdminDashboard(true);
      alert('✅ Admin Dashboard Unlocked.');
      navigate('/admin'); // ✅ REDIRECT TO ADMIN PAGE
    } else {
      alert('❌ Incorrect Admin Key.');
    }
  };

  return (
    <>
      <footer className="footer-container">
        <div className="footer-logo">
          <img src="/images/logo.jpg" alt="Hclicks Logo" className="footer-logo-image" />
        </div>
        <div className="footer-links">
          <ul>
            <li>
              {/* <a href="/contact"> */}
              Contact:
              {/* </a> */}
            </li>
            {/* <li><a href="#!" onClick={handleAdminAccess}>Admin Dashboard</a></li> */}
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
    </>
  );
};

export default Footer;