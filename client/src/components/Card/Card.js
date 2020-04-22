import React from 'react';
import Moment from 'react-moment';

function Card (props) {
  console.log(props.info.date.getDay())
  const date = `${props.info.time[0]}:${props.info.time[1]}`
  return (
    <div className='card-container'>
      <div className='image-container'>
        <img src={props.info.image} className='card-image' />
      </div>
      <div className='card-time'><Moment format="ddd Do MMM">{props.info.date}</Moment>{`,  ${date}`}</div>
      <div className='card-title'>
      {props.info.title}
        </div>
    </div>
  );
}

export { Card as default };
