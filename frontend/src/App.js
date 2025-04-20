// File: src/App.js

import Header from './components/Header';
import Gallery from './components/Gallery';
import Services from './components/Services';
import BookingForm from './components/BookingForm';
import About from './components/About';
import Footer from './components/Footer';

function App() {
  return (
    <div>
      <Header />
      <Gallery />
      <BookingForm />
      <About />
      <Footer />
    </div>
  );
}

export default App;