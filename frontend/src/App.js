import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from './components/Header';
import Gallery from './components/Gallery';
import Services from './components/Services';
import BookingForm from './components/BookingForm';
import Reviews from './components/Reviews';
import About from './components/About';
import Footer from './components/Footer';
import AdminDashboard from './components/AdminDashboard';

function App() {
  const [showAdmin, setShowAdmin] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:4000/test')
      .then(res => {
        console.log("✅ Backend Connected:", res.data);
      })
      .catch(err => {
        console.error("❌ Backend Connection Error:", err);
      });
  }, []);

  return (
    <div>
      {showAdmin ? (
        <AdminDashboard />
      ) : (
        <>
          <Header />
          <Gallery />
          <Services />
          <BookingForm />
          <Reviews />
          <About />
        </>
      )}
      <Footer setShowAdmin={setShowAdmin} />
    </div>
  );
}

export default App;