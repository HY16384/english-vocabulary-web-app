import React from 'react';
import { Link } from 'react-router-dom';
import '../css/homepage.css';

function Homepage() {
  return (
    <div className="homepage-container">
      <h1 className="homepage-title">Welcome to English Vocabulary App</h1>
      <p className="homepage-description">Improve your English vocabulary with our app!</p>
      <Link to="/wordlist" className="homepage-button">
        Get Started
      </Link>
    </div>
  );
}

export default Homepage;
