import React, { useEffect } from 'react';
import axios from 'axios';
import Header from './components/Header';
import Gallery from './components/Gallery';
import Services from './components/Services';
import BookingForm from './components/BookingForm';
import About from './components/About';
import Footer from './components/Footer';

function App() {
  useEffect(() => {
    // 👇 Backend connection test
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
      <Header />
      <Gallery />
      <Services />
      <BookingForm />
      <About />
      <Footer />
    </div>
  );
}

export default App;
