import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const SimpleHome = () => <div>Home Page - TEST</div>;
const SimpleAbout = () => <div>About Page</div>;

function SimpleApp() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SimpleHome />} />
        <Route path="/about" element={<SimpleAbout />} />
      </Routes>
    </Router>
  );
}

export default SimpleApp;
