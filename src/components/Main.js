import React, { useEffect } from 'react';

import '../styles/main.css'
import data from '../data'

function AboutPage (props) {
  const unitWidth = 200;
  function timeToPosition (minutes, hours) {
    return unitWidth * hours + unitWidth * (minutes / 60)
  }
  useEffect(() => {
    const slider = document.querySelector('.gc2');
    const slider2 = document.querySelector('.gc1');
    const now = document.querySelector('.now');
    let today = new Date()
    let hours = today.getHours() - 1
    let minutes = today.getMinutes()

    let time = timeToPosition(minutes, hours)

    slider.scrollLeft = time - window.innerWidth / 2;
    now.style.left = `${time - slider.scrollLeft}px`

    var timeDiv = document.createElement('div');
    timeDiv.className = 'now2';
    let hours1 = 12
    let minutes1 = 0
    timeDiv.style.left = `${(minutes1/60)*100}%`
    document.querySelector(`#time${hours1}`).appendChild(timeDiv);


    let isDown = false;
    let startX;
    let startY;
    let scrollLeft;
    let scrollTop;
    let dragging = false

    slider.addEventListener('mouseenter', (e) => {
      e.preventDefault();
    })
    slider.addEventListener('mousedown', (e) => {
      isDown = true;
        startX = e.pageX - slider.offsetLeft;
      startY = e.pageY - slider.offsetTop;
      scrollLeft = slider.scrollLeft;
      scrollTop = slider.scrollTop;
    });
    slider.addEventListener('scroll', (e) => {
      if (dragging) return;
      slider2.scrollLeft = slider.scrollLeft;
      now.style.left = `${time - slider.scrollLeft}px`

    });
    slider.addEventListener('mouseup', () => {
      isDown = false;
      dragging = false;
    });
    slider.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      dragging = true;
      const x = e.pageX - slider.offsetLeft;
      const y = e.pageY - slider.offsetTop;
      const walkx = (x - startX);
      const walky = (y - startY);
      slider.scrollLeft = scrollLeft - walkx;
      slider.scrollTop = scrollTop - walky;
      slider2.scrollLeft = slider.scrollLeft;
      now.style.left = `${time - slider.scrollLeft}px`
    });
  });

  const hours = []
  for (let i = 0; i < 24; i++) {
    let index = (i).toString()
    if (index.length < 2) index = '0' + index
    hours.push(<div className="grid-item2"  key={i}>{`${index}:00`}</div>)
  }
  const content = []
  for (let i = 0; i < 48; i++) {
    content.push(<div className="grid-item" id={`time${i}`} key={i}>Content {i}</div>)
  }

  //// Data processing

  ////
  return (

    <div className="outer-container">

      <div className="container c1">
        <div className="grid-container gc1">
          {hours}
          <div className="now"></div>
        </div>
      </div>

      <div className="container c2">
        <div className="grid-container gc2">
          {content}
        </div>
      </div>

    </div>
  );

}

export default AboutPage;
