import React, { useEffect, useState } from 'react';

import data from '../../mocks/data';

function AboutPage(props) {
  const [rowCounter, setRowCounter] = useState(1);
  const [rows, setRows] = useState([]);
  const [rowStorage, setRowStorage] = useState([Array(96)]);
  const [hours, setHours] = useState([]);
  useEffect(() => {
    let localHours = [];
    for (let i = 0; i < 24; i++) {
      let index = i.toString();
      if (index.length < 2) index = '0' + index;
      if (i < 23)
        localHours.push(
          <div
            id={`margin${i}`}
            className='grid-item1'
            key={i}
          >{`${index}:00`}</div>
        );
      else
        localHours.push(
          <div className='grid-item1 end' key={i}>{`${index}:00`}</div>
        );
    }
    setHours(localHours);
    const tempRows = [];
    for (let j = 0; j < rowCounter; j++) {
      const content = [];
      for (let i = 0; i < 24; i++) {
        content.push(
          <div className='grid-item2' id={`time${i}`} key={i}></div>
        );
      }
      tempRows.push(
        <div className='flex-container fc2' id={`row${j}`} key={j}>
          {content}
        </div>
      );
    }
    setRows(tempRows);
  }, []);

  const unitWidth = 200;
  function timeToPosition(minutes, hours) {
    return unitWidth * hours + unitWidth * (minutes / 60);
  }

  useEffect(() => {
    if (hours.length > 0) {
      const slider = document.querySelector('.c2');
      const slider2 = document.querySelector('.fc1');
      let today = new Date();
      let hours = today.getHours();
      let minutes = today.getMinutes();

      let time = timeToPosition(minutes, hours);
      slider.scrollLeft = time - window.innerWidth / 2;
      const timeDiv = document.createElement('div');
      timeDiv.className = 'now';
      timeDiv.style.left = `${(minutes / 60) * 100}%`;
      timeDiv.style.height = `${400 * rowCounter}px`;
      document.querySelector(`#time${hours}`).appendChild(timeDiv);

      let isDown = false;
      let startX;
      let startY;
      let scrollLeft;
      let scrollTop;
      let dragging = false;

      slider.addEventListener('mouseenter', (e) => {
        e.preventDefault();
      });
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
        const walkx = x - startX;
        const walky = y - startY;
        slider.scrollLeft = scrollLeft - walkx;
        slider.scrollTop = scrollTop - walky;
        slider2.scrollLeft = slider.scrollLeft;
      });
      //// Data processing
      let localRowCounter = rowCounter;
      for (let i = 0; i < data.length; i++) {
        let localRowStorage = [...rowStorage];
        const contentHours = data[i].time[0];
        const contentMins = data[i].time[1];
        const contentLengthHours = data[i].length[0];
        const contentLengthMinutes = data[i].length[1];
        const startBlock = contentHours * 4 + contentMins / 15;
        const blockLength = contentLengthHours * 4 + contentLengthMinutes / 15;
        let spaceCheck;
        let selectedRow;
        for (let i = 0; i < localRowStorage.length; i++) {
          spaceCheck = true;
          for (let j = startBlock; j < startBlock + blockLength; j++) {
            if (localRowStorage[i][j] === 1) {
              spaceCheck = false;
              j = startBlock + blockLength;
            } else {
              localRowStorage[i][j] = 1;
            }
          }
          if (spaceCheck) {
            selectedRow = i;
            setRowStorage(localRowStorage);
            i = localRowStorage.length;
          }
        }
        if (!spaceCheck) {
          localRowStorage.push(Array(96));
          for (let j = startBlock; j < startBlock + blockLength; j++) {
            localRowStorage[localRowStorage.length - 1][j] = 1;
          }
          setRowStorage(localRowStorage);
          const newRow = document.createElement('div');
          newRow.id = `row${localRowCounter}`;
          newRow.className = 'flex-container fc2';
          for (let i = 0; i < 24; i++) {
            const newItem = document.createElement('div');
            newItem.id = `time${i}`;
            newItem.className = 'grid-item2';
            newRow.appendChild(newItem);
          }
          document.querySelector(`.c2`).appendChild(newRow);
          localRowCounter++;
          selectedRow = localRowCounter - 1;
        }

        const newContent = document.createElement('div');
        newContent.className = `content`;
        newContent.id = `content${i}`;
        newContent.style.left = `${(contentMins / 60) * 100}%`;
        newContent.style.width = `${
          contentLengthHours * unitWidth +
          (contentLengthMinutes / 60) * unitWidth
        }px`;
        const newTitle = document.createElement('div');
        newTitle.className = `content-title`;
        newTitle.innerHTML = data[i].title;
        const newDescription = document.createElement('div');
        newDescription.className = `content-description`;
        newDescription.innerHTML = data[i].description;
        newContent.appendChild(newTitle);
        newContent.appendChild(newDescription);
        document
          .querySelector(`#row${selectedRow} #time${contentHours}`)
          .appendChild(newContent);
      }
      setRowCounter(localRowCounter);
      ////
    }
  }, [hours]);

  useEffect(() => {
    const timeDiv = document.querySelector('.now');
    if (timeDiv) timeDiv.style.height = `${400 * rowCounter}px`;
  }, [rowCounter]);

  return (
    <div className='outer-container'>
      <div className='container c1'>
        <div className='flex-container fc1'>{hours}</div>
      </div>

      <div className='container c2'>{rows}</div>
    </div>
  );
}

export { AboutPage as default };
