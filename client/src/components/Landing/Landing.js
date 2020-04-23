import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import data from '../../mocks/data';
import mainImage from '../../assets/images/main.jpg'
import Card from '../Card'

function Landing (props) {

  return (
    <div className='landing-outer-container'>
      <div className='landing-container'>
        <div className='header-container'>
          <div className='header-text'>
            <div className='title-container'>
              <h2>Performing From Home</h2>
              <h3 className='title-sub'>is here to help artists who have been affected by the Coronavirus</h3>
            </div>
            <div className='support'>Show your support but signing up to your favorite performers' Patreon </div>
            <div className='link-container'>
              <a href="#events" className='title-sub schedule-link main-button' to='/'>Browse Events</a>
              <Link className='title-sub schedule-link main-button' to='/schedule'>Whats on now</Link>
            </div>
          </div>
          <img className='main-image' src={mainImage} />
        </div>
        <div id='events'></div>
        <div className='event-container'>
          {data.map((info,index)=>{
            return <Card
              info = {info}
              key ={index}
            />
          })}
        </div>
      </div>
    </div>
  );
}

export { Landing as default };

