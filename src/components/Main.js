import React, { useEffect } from 'react';

import '../styles/main.css'
import data from '../data'

function AboutPage (props) {
  let rowCounter = 2;
  const unitWidth = 200;
  function timeToPosition (minutes, hours) {
    return unitWidth * hours + unitWidth * (minutes / 60)
  }
  useEffect(() => {
    const container = document.querySelector('.c2');
    const slider = document.querySelector('.fc2');
    const slider2 = document.querySelector('.fc1');
    const allSliders = document.querySelectorAll('.fc1');
    let today = new Date()
    let hours = today.getHours()
    let minutes = today.getMinutes()

    let time = timeToPosition(minutes, hours)
    slider.scrollLeft = time - window.innerWidth / 2;
    const timeDiv = document.createElement('div');
    timeDiv.className = 'now';
    timeDiv.style.left = `${(minutes / 60) * 100}%`
    document.querySelector(`#time${hours}`).appendChild(timeDiv);


    let isDown = false;
    let startX;
    let startY;
    let scrollLeft;
    let scrollTop;
    let dragging = false

    container.addEventListener('mouseenter', (e) => {
      e.preventDefault();
    })
    container.addEventListener('mousedown', (e) => {
      isDown = true;
      startX = e.pageX - slider.offsetLeft;
      startY = e.pageY - slider.offsetTop;
      scrollLeft = slider.scrollLeft;
      scrollTop = slider.scrollTop;
    });
    container.addEventListener('scroll', (e) => {
      if (dragging) return;
      slider2.scrollLeft = slider.scrollLeft;

    });
    container.addEventListener('mouseup', () => {
      isDown = false;
      dragging = false;
    });
    container.addEventListener('mousemove', (e) => {
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
      console.log(slider)
    });
    //// Data processing
    for (let i = 0; i < data.length; i++) {
      const newContent = document.createElement('div');
      const contentHours = data[i].time[0]
      const contentMins = data[i].time[1]
      newContent.className = `content`;
      newContent.id = `content${i}`;
      newContent.innerHTML = data[i].title;
      newContent.style.left = `${(contentMins / 60) * 100}%`
      newContent.style.width = `${data[i].length[0] * unitWidth + (data[i].length[1] / 60) * unitWidth}px`
      document.querySelector(`#time${contentHours}`).appendChild(newContent);

    }
    ////
  });

  const hours = []
  for (let i = 0; i < 24; i++) {
    let index = (i).toString()
    if (index.length < 2) index = '0' + index
    if (i < 23) hours.push(<div className="grid-item1" key={i}>{`${index}:00`}</div>)
    else hours.push(<div className="grid-item1 end" key={i}>{`${index}:00`}</div>)
  }
  const rows = []
  for (let j = 0; j < rowCounter; j++) {
    const content = []
    for (let i = 0; i < 24; i++) {
      content.push(<div className="grid-item2" id={`time${i}`} key={i}>Content {i}</div>)
    }
    rows.push(<div className="flex-container fc2" id={`row${j}`} key={j}>{content}</div>)

  }

  return (

    <div className="outer-container">

      <div className="container c1">
        <div className="flex-container fc1">
          {hours}
        </div>
      </div>

      <div className="container c2">
        {rows}
      </div>

    </div>
  );

}

export default AboutPage;
