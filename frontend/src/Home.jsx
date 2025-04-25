import React from 'react';
import Header from './components/Header';
import Gallery from './components/Gallery';
import Services from './components/Services';
import BookingForm from './components/BookingForm';
import Reviews from './components/Reviews';
import About from './components/About';
import Footer from './components/Footer';


export const Home = () => {

    return (
        <>
            <Header />
            <Gallery />
            <Services />
            <BookingForm />
            <Reviews />
            <About />
            <Footer />
        </>
    )
}

export default Home;