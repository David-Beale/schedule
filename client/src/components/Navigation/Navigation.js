import React from 'react';
import { Link } from 'react-router-dom';

function Navigation(props) {
  return (
    <div className='navigation-container'>
      <Link to='/' className='button'>
        <div className='navigation-name'>Performing From Home</div>
      </Link>
      <div className='navigation-links-container'>
        <Link className='button' to='/'>
          <div>Home</div>
        </Link>
        <Link className='button' to='/schedule'>
          <div>Schedule</div>
        </Link>
        <Link className='button' to='/'>
          <div>Nav2</div>
        </Link>
        <Link className='button' to='/submit'>
          <div>Create Event</div>
        </Link>
      </div>
    </div>
  );
}

export { Navigation as default };
