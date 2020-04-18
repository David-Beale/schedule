import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/navigation.css'

function Navigation (props) {
  return (
    <div className="navigation-container">
      <Link
        to="/"
        className="button"
        >

        <div className="navigation-name">Logo</div>
      </Link>
      <div className="navigation-links-container">
        <Link
          className="button"
          to="/"
        >
          <div>Home</div>
        </Link>
        <Link
          className="button"
          to="/projects"
        >
          <div>Nav1</div>
        </Link>
        <Link
          className="button"
          to="/about"
        >
          <div>Nav2</div>
        </Link>
        <Link
          className="button"
          to="/contact"
        >
          <div>Nav3</div>
        </Link>
      </div>
    </div>
  )
}

export default Navigation