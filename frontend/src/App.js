import React, { useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom'; // ✅ NEW IMPORTS
import axiosInstance from './util/axiosInstance';
import Home from './Home';
import AdminDashboard from './components/AdminDashboard';


function App() {
  useEffect(() => {
    axiosInstance.get('/test')
      .then(res => {
        console.log("✅ Backend Connected:", res.data);
      })
      .catch(err => {
        console.error("❌ Backend Connection Error:", err);
      });
  }, []);

  return (
    <>
      <header
        style={{

          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 1rem"
        }}
      >

        {/* <Link to="/"> */}
          <h2>Home</h2>
        {/* </Link> */}


        <nav >
          <Link to="/">Home</Link>
          <Link to="/admin">Admin</Link>
        </nav>
      </header>
      <Routes>
        <Route
          path="/"
          element={<Home />}
        />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </>
  );
}

export default App;