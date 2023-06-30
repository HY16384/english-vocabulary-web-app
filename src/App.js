import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import HomePage from './js/Homepage';
import WordListPage from './js/WordListPage';
import QuizPage from './js/QuizPage';
import AboutPage from './js/AboutPage';
import './css/navigation.css';

library.add(faBars, faTimes);

function App() {
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  return (
    <Router>
      <div className={`sidebar${sidebarVisible ? ' visible' : ''}`}>
        <ul className="nav-links">
          <li>
            <NavLink exact to="/" className="nav-link" activeClassName="active">
              <i className="fa fa-home"></i> Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/wordlist" className="nav-link" activeClassName="active">
              <i className="fa fa-list"></i> Word List
            </NavLink>
          </li>
          <li>
            <NavLink to="/quiz" className="nav-link" activeClassName="active">
              <i className="fa fa-question-circle"></i> Quiz
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" className="nav-link" activeClassName="active">
              <i className="fa fa-info-circle"></i> About
            </NavLink>
          </li>
        </ul>
      </div>

      <button className={`sidebar-toggle${sidebarVisible ? ' active' : ''}`} onClick={toggleSidebar}>
        <FontAwesomeIcon icon={sidebarVisible ? faTimes : faBars} />
      </button>

      <div className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/wordlist" element={<WordListPage />} />
          <Route path="/quiz" element={<QuizPage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
