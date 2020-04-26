import React from 'react';
import { Link } from 'react-router-dom';
import { useStitchAuth } from '../StitchAuth/StitchAuth';
import './Navigation.css';

function Navigation(props) {
  const { isLoggedIn, actions } = useStitchAuth();
  const toggleMenu = () => {
    const x = document.getElementById('myTopnav');
    if (x.className === "navigation-container") {
      x.className += " responsive";
    } else {
      x.className = "navigation-container";
    }
  }

  return (
    <div id='myTopnav' className="navigation-container">
      <Link to="/" id='logo' className="button">
        <div className="navigation-name">Logo</div>
      </Link>
      <div className="navigation-links-container">
        <Link className="button menu" onClick={toggleMenu} to="/">
          <div>Home</div>
        </Link>
        <Link className="button menu" onClick={toggleMenu} to="/schedule">
          <div>Schedule</div>
        </Link>
        {isLoggedIn && (
          <Link className="button menu" onClick={toggleMenu} to="/events">
            <div>Your Events</div>
          </Link>
        )}
        {isLoggedIn && (
          <Link className="button menu" onClick={toggleMenu} to="/form">
            <div>Create Event</div>
          </Link>
        )}
        <Link className="button menu" onClick={toggleMenu} to="/about">
          <div>About</div>
        </Link>
        {isLoggedIn ? (
          <Link className="button menu" onClick={toggleMenu} to="/logout">
            <div onClick={actions.handleLogout}>Logout</div>
          </Link>
        ) : (
            <Link className="button menu" onClick={toggleMenu} to="/login">
              <div>Login</div>
            </Link>
          )}
        <a className="icon" onClick={toggleMenu}>&#9776;</a>
      </div>
    </div>
  );
}

export { Navigation as default };
