import React, { useState } from 'react';
import Moment from 'react-moment';
import Countdown from '../Countdown'
import EventModal from '../EventModal/EventModal';

function Card(props) {
  const [flipped, setFlipped] = useState(false)
  const [modalVisible, setModalVisible] = useState(false);
  const handleClick = () => {
    setFlipped(!flipped)
  }
  const toggleModal = (e) => {
    e.stopPropagation();
    setModalVisible(!modalVisible);
  }
  
  return (
    <div>
      <div className='flip-card'>
        <div onClick={handleClick} className={flipped ? 'flip flip-card-inner' : 'flip-card-inner'} >
          <div className='card-container flip-card-front'>
            <div className='image-container'>
              <img src={props.info.image} className='card-image' />
            </div>
            <div className='card-time'><Moment format="ddd Do MMM, HH:mm">{props.info.date}</Moment></div>
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
            <a onClick={toggleModal} className='event-link'>Click here</a>
          </div>
        </div>

      </div>
      modalVisible ? 
      <EventModal visible={modalVisible} toggleModal={toggleModal} info={props.info} /> : null;
    </div>
  );
}

export { Card as default };
