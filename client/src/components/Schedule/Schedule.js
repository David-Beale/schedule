import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Moment from 'react-moment';
import ScheduleCard from '../Schedule-card'

function Schedule (props) {
  const [rowCounter, setRowCounter] = useState(1);
  const [rows, setRows] = useState([]);
  const [initialRow, setInitialRow] = useState([]);
  const [hoursArray, setHoursArray] = useState([]);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const dataStart = useSelector(({ eventsReducer }) => eventsReducer.events);
  const today = new Date();
  const [currentDay, setCurrentDay] = useState(today);
  const [positions, setPositions] = useState([])
  const [renderCards, setRenderCards] = useState(false)
  const hours = today.getHours();
  const minutes = today.getMinutes();


  //import data store
  useEffect(() => {
    if (dataStart.length > 0) {
      let array = dataStart.map((event) => event.eventData);
      setData(array);
      filterByDay(array, today);
    }
  }, [dataStart]);
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
            className="grid-item1"
            key={i}
          >{`${index}:00`}</div>
        );
      else
        localHours.push(
          <div className="grid-item1 end" key={i}>{`${index}:00`}</div>
        );
    }
    setHoursArray(localHours);
    //setup first row
    const tempRows = [];
    const content = [];
    for (let i = 0; i < 24; i++) {
      content.push(<div className="grid-item2" id={`time${i}`} key={i}></div>);
    }
    tempRows.push(
      <div className="flex-container fc2" id={`row${0}`} key={0}>
        {content}
      </div>
    );
    setInitialRow(tempRows);
    setRows(tempRows);
  }, []);

  const unitWidth = 175;

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
      timeDiv.style.height = `${200 * rowCounter}px`;
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
    // Database info processing
    if (hoursArray.length > 0 && filteredData.length > 0) {
      const tempRows = initialRow.slice();
      let localRowCounter = 1;
      let localRowStorage = [Array(96)];
      let localPositions = []
      for (let i = 0; i < filteredData.length; i++) {
        const contentHours = +filteredData[i].date.getHours();
        const contentMins = +filteredData[i].date.getMinutes();
        let contentLength =
          (filteredData[i].endTime.getTime() - filteredData[i].date.getTime()) /
          1000 /
          60;
        if (contentLength === 0) continue;
        const startBlock = Math.floor(contentHours * 4 + contentMins / 15);
        let blockEnd = Math.ceil(
          contentHours * 4 + contentMins / 15 + contentLength / 15
        );
        if (blockEnd > 96) {
          blockEnd = 96;
        }
        let spaceCheck;
        let selectedRow;
        for (let i = 0; i < localRowStorage.length; i++) {
          spaceCheck = true;
          for (let j = startBlock; j < blockEnd; j++) {
            if (localRowStorage[i][j] === 1) {
              spaceCheck = false;
              j = blockEnd;
            } else {
              localRowStorage[i][j] = 1;
            }
          }
          if (spaceCheck) {
            selectedRow = i;
            i = localRowStorage.length;
          }
        }
        if (!spaceCheck) {
          localRowStorage.push(Array(96));
          for (let j = startBlock; j < blockEnd; j++) {
            localRowStorage[localRowStorage.length - 1][j] = 1;
          }
          const content = [];
          for (let i = 0; i < 24; i++) {
            content.push(<div className="grid-item2" id={`time${i}`} key={i}></div>);
          }
          tempRows.push(
            <div className="flex-container fc2" id={`row${localRowCounter}`} key={localRowCounter}>
              {content}
            </div>
          );
          localRowCounter++;
          selectedRow = localRowCounter - 1;
        }
        localPositions.push({ selectedRow, startBlock, blockEnd })
      }
      setRowCounter(localRowCounter);
      setPositions(localPositions)
      setRenderCards(true)
      setRows(tempRows);
    } else if (hoursArray.length > 0 && filteredData.length === 0) {
      setRows(initialRow);
      setRowCounter(1);
    }
  }, [filteredData]);
  useEffect(() => {
    const timeDiv = document.querySelector('.now');
    if (timeDiv) timeDiv.style.height = `${200 * rowCounter}px`;
  }, [rowCounter]);

  const dayBack = () => {
    let day = currentDay;
    day = new Date(day.setDate(day.getDate() - 1));
    setCurrentDay(day);
    setRenderCards(false)
    filterByDay(data, day);
  };
  const dayFwd = () => {
    let day = currentDay;
    day = new Date(day.setDate(day.getDate() + 1));
    setCurrentDay(day);
    setRenderCards(false)
    filterByDay(data, day);
  };
  const filterByDay = (array, filterDay) => {
    let year = filterDay.getFullYear();
    let month = filterDay.getMonth();
    let day = filterDay.getDate();
    let now = new Date(year, month, day);
    let filtered = array.filter((event) => {
      let eventDate = event.date;
      let evetYear = eventDate.getFullYear();
      let eventMonth = eventDate.getMonth();
      let eventDay = eventDate.getDate();
      eventDate = new Date(evetYear, eventMonth, eventDay);
      return eventDate - now === 0;
    });
    setFilteredData(filtered);
  };
  return (
    <div className="outer-container">
      <div className="container date">
        <div onClick={dayBack} className="arrow">&#x2B05;</div>{' '}<Moment className="sched-time" format="ddd Do MMM">{currentDay}</Moment>{' '}<div onClick={dayFwd} className="arrow">&#x27A1;
        </div>
      </div>
      <div className="container c1">
        <div className="flex-container fc1">{hoursArray}</div>
      </div>

      <div className="container c2">
        {rows}
        {renderCards && filteredData.map((event, index) => {
          return (
            <ScheduleCard
              key={index}
              event={event}
              unitWidth={unitWidth}
              hours={hours}
              minutes={minutes}
              position={positions[index]}
            />
          )
        })}
      </div>
    </div>
  );
}

export { Schedule as default };
