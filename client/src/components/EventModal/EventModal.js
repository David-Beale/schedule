import React, { useState } from 'react';
import { Modal } from 'antd';
import './EventModal.css';
import ReactPlayer from 'react-player';

function EventModal({ info, visible, toggleModal }) {
  return (
    <Modal
      title={`${info.title} - ${info.artistName}`}
      centered
      visible={visible}
      onCancel={toggleModal}
      footer={null}
      bodyStyle={{ background: 'black' }}
      width={'70vw'}
      height={'75vh'}
    >
      <ReactPlayer
        url={info.streamUrl}
        playing={visible}
        controls={true}
        width="100%"
        height="75vh"
      />
    </Modal>
  );
}

export default EventModal;
