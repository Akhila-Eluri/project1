import Header from './components/Header';
import Gallery from './components/Gallery';
import Services from './components/Services'; // ✅ new import
import BookingForm from './components/BookingForm';
import About from './components/About';
import Footer from './components/Footer';

function App() {
  return (
    <div>
      <Header />
      <Gallery />
      <Services />  {/* ✅ Services section inserted here */}
      <BookingForm />
      <About />
      <Footer />
    </div>
  );
}

export default App;