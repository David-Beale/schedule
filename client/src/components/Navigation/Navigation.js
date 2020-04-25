import React from 'react';
import { Link } from 'react-router-dom';
import { useStitchAuth } from '../StitchAuth/StitchAuth';
import './Navigation.css';

function Navigation (props) {
  const { isLoggedIn, actions } = useStitchAuth();
  return (
    <div className="navigation-container">
      <Link to="/" className="button">
        <div className="navigation-name">Logo</div>
      </Link>
      <div className="navigation-links-container">
        <Link className="button" to="/">
          <div>Home</div>
        </Link>
        <Link className="button" to="/schedule">
          <div>Schedule</div>
        </Link>
        {isLoggedIn && (
          <Link className="button" to="/projects">
            <div>Nav1</div>
          </Link>
        )}
        {isLoggedIn && (
          <Link className="button" to="/form">
            <div>Create Event</div>
          </Link>
        )}
        <Link className="button" to="/about">
          <div>Nav2</div>
        </Link>
        {isLoggedIn ? (
          <Link className="button" to="/logout">
            <div onClick={actions.handleLogout}>Logout</div>
          </Link>
        ) : (
            <Link className="button" to="/login">
              <div>Login</div>
            </Link>
          )}
      </div>
    </div>
  );
}

export { Navigation as default };
