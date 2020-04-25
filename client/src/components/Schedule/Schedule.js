import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import data from '../../mocks/data';

function Schedule (props) {
  const [rowCounter, setRowCounter] = useState(1);
  const [rows, setRows] = useState([]);
  const [rowStorage, setRowStorage] = useState([Array(96)]);
  const [hoursArray, setHoursArray] = useState([]);
  const [data, setData] = useState([])
  const dataStart = useSelector(({ eventsReducer }) => eventsReducer.events);
  const today = new Date();
  const hours = today.getHours();
  const minutes = today.getMinutes();

  //import data store
  useEffect(() => {
    console.log(dataStart)
    if (Object.values(dataStart).length>0) {
      let array = Object.values(dataStart).map(event => event.eventData)
      setData(array)
    }
  }, [dataStart])
  useEffect(() => {
    //setup time top margin
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
    setHoursArray(localHours);
    //setup first row
    const tempRows = [];
    const content = [];
    for (let i = 0; i < 24; i++) {
      content.push(
        <div className='grid-item2' id={`time${i}`} key={i}></div>
      );
    }
    tempRows.push(
      <div className='flex-container fc2' id={`row${0}`} key={0}>
        {content}
      </div>
    );
    setRows(tempRows);
  }, []);

  const unitWidth = 350;


  useEffect(() => {
    if (hoursArray.length > 0) {
      const slider = document.querySelector('.c2');
      const slider2 = document.querySelector('.fc1');

      //setup current time indicator
      let time = unitWidth * hours + unitWidth * (minutes / 60);
      slider.scrollLeft = time - window.innerWidth / 2;
      const timeDiv = document.createElement('div');
      timeDiv.className = 'now';
      timeDiv.style.left = `${(minutes / 60) * 100}%`;
      timeDiv.style.height = `${400 * rowCounter}px`;
      document.querySelector(`#time${hours}`).appendChild(timeDiv);

      //setup drag to scroll 
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

    }
  }, [hoursArray]);
  useEffect(() => {
    if (hoursArray.length > 0 && data.length>0) {
      // Database info processing
      let localRowCounter = rowCounter;
      for (let i = 0; i < data.length; i++) {
        let localRowStorage = [...rowStorage];
        const contentHours = +data[i].date.getHours();
        const contentMins = +data[i].date.getMinutes();
        const contentLength = (data[i].endTime.getTime() - data[i].date.getTime()) / 1000 / 60
        console.log(contentLength)
        const startTime = contentHours + contentMins / 60
        const startBlock = contentHours * 4 + contentMins / 15;
        const endTime = startTime + contentLength / 60
        const blockLength = contentLength / 15;
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
          (contentLength / 60) * unitWidth
          }px`;
        if (startTime < hours + (minutes / 60) && endTime > hours + (minutes / 60)) {
          newContent.style.background = 'linear-gradient(to bottom, #f7f7f7 0%,#f3dec7 70%,#faac87f6 100%) '
        }
        const newTitle = document.createElement('div');
        newTitle.className = `content-title`;
        newTitle.innerHTML = data[i].title;
        const newDescription = document.createElement('div');
        newDescription.className = `content-description`;
        newDescription.innerHTML = data[i].description;
        const newImageContainer = document.createElement('div');
        newImageContainer.className = `content-image-container`;
        const newImage = document.createElement('img');
        newImage.className = `content-image`;
        newImageContainer.appendChild(newImage);
        newImage.src = data[i].image;
        newContent.appendChild(newImageContainer);
        newContent.appendChild(newTitle);
        newContent.appendChild(newDescription);
        document
          .querySelector(`#row${selectedRow} #time${contentHours}`)
          .appendChild(newContent);
      }
      setRowCounter(localRowCounter);
    }
  }, [data]);
  useEffect(() => {
    const timeDiv = document.querySelector('.now');
    if (timeDiv) timeDiv.style.height = `${400 * rowCounter}px`;
  }, [rowCounter]);

  return (
    <div className='outer-container'>
      <div className='container c1'>
        <div className='flex-container fc1'>{hoursArray}</div>
      </div>

      <div className='container c2'>{rows}</div>
    </div>
  );
}

export { Schedule as default };
