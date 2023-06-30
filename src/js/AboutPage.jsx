import React from 'react';
import '../css/aboutpage.css';

function AboutPage() {
  return (
    <div className="aboutpage-container">
      <h1 className="aboutpage-title">About</h1>
      <p className="aboutpage-text">Welcome to the English Vocabulary Web App! This app is designed to help you improve your English vocabulary in an interactive and engaging way.</p>
      <p className="aboutpage-text">Features:</p>
      <ul className="aboutpage-list">
        <li className="aboutpage-list-item">Create and manage your word list</li>
        <li className="aboutpage-list-item">Take quizzes to test your knowledge</li>
      </ul>
      <p className="aboutpage-text">Enjoy your learning journey with the English Vocabulary Web App!</p>
      <p className="aboutpage-developer">Developed by: Me</p>
    </div>
  );
}

export default AboutPage;
