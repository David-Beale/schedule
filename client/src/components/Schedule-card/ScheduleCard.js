import React , {useState} from 'react';
import EventModal from '../EventModal/EventModal';

function ScheduleCard (props) {
  const [modalVisible, setModalVisible] = useState(false);
  const toggleModal = (e) => {
    setModalVisible(!modalVisible);
  };

  let background = ''
  const width = (props.position.blockEnd - props.position.startBlock) * props.unitWidth/4
  let widthStyle = ''
  // if (props.startTime < props.hours + props.minutes / 60 && props.endTime > props.hours + props.minutes / 60) {
  //   background = 'linear-gradient(to bottom, #f7f7f7 0%,#fcf2e3 70%,#fcebd5 100%)';
  // }
  if (width < 175) {
    widthStyle = `${width}px`;
  }
  const divStyle = {
    left: `${props.position.startBlock* props.unitWidth/4}px`,
    top: `${props.position.selectedRow* 200}px`,
    width: `${width}px`,
    background: background,
  }
  return (
    <div className='content' onClick={toggleModal} style={divStyle}>
      <div className='content-image-container' style={{ width: widthStyle }}>
        <img className='content-image' src={props.event.image} />
      </div>
      <div className='content-title'>
        {props.event.title}
      </div>
      <EventModal
        visible={modalVisible}
        toggleModal={toggleModal}
        info={props.event}
      />
    </div>
  )
}

export { ScheduleCard as default };