import React, { useState } from 'react';
import Moment from 'react-moment';
import play from '../../assets/images/play.png'
import Countdown from '../Countdown'

function Card (props) {
  const [flipped, setFlipped] = useState(false)
  const date = `${props.info.time[0]}:${props.info.time[1]}`
  const handleClick = () => {
    setFlipped(!flipped)
  }
  const linkClick = (e) => {
    e.stopPropagation();
  }
  return (
    <div className='flip-card'>
      <div onClick={handleClick} className={flipped ? 'flip flip-card-inner' : 'flip-card-inner'} >
        <div className='card-container flip-card-front'>
          <div className='image-container'>
            <img src={props.info.image} className='card-image' />
          </div>
          <div className='card-time'><Moment format="ddd Do MMM">{props.info.date}</Moment>{`,  ${date}`}</div>
          <div className='card-title'>
            {props.info.title}
          </div>
        </div>

        <div className='card-container flip-card-back'>
          <div className='card-title back'>
            {props.info.title}
          </div>
          <div className='description-container'>
            {props.info.description}
          </div>
          <div className='countdown-container'>
            {flipped &&
              <Countdown
                info={props.info}
              />
            }
          </div>
          <a onClick={linkClick} className='event-link'>Click here</a>
        </div>
      </div>

    </div>

  );
}

export { Card as default };
