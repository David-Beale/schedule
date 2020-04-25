import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import * as _ from 'underscore';
import { useSelector } from 'react-redux';

import mainImage from '../../assets/images/main.jpg'
import Card from '../Card'

function Landing (props) {

  const [filterValue, setFilterValue] = useState('')
  const [data, setData] = useState([])
  const [dataOriginal, setDataOriginal] = useState([])
  const dataStart = useSelector(({ eventsReducer }) => eventsReducer.events);

  const handleChange = (e) => {
    setFilterValue(e.target.value)
  }
  useEffect(() => {
    if (dataStart) {
      let array = dataStart.map(event => event.eventData)
      setData(array)
      setDataOriginal(array)
    }
  }, [dataStart])

  useEffect(() => {
    if (filterValue.length > 0) {
      let arrayOfWords = filterValue.toLowerCase()
      let newData = dataOriginal.filter(event => {
        let title = event.title.toLowerCase()
        return title.includes(arrayOfWords)
      })
      setData(newData)
    } else {
      if (dataOriginal.length > 0) {
        setData(dataOriginal)
      }
    }
  }, [filterValue])

  return (
    <div className='landing-outer-container'>
      <div className='landing-container'>
        <div className='header-container'>
          <div className='header-text'>
            <div className='title-container'>
              <h2>Performing From Home</h2>
              <h3 className='title-sub'>is here to help artists who have been affected by the Coronavirus</h3>
            </div>
            <div className='support'>Show your support by signing up to your favorite performers' Patreon </div>
            <div className='link-container'>
              <a href="#events" className='title-sub schedule-link main-button' to='/'>Browse Events</a>
              <Link className='title-sub schedule-link main-button' to='/schedule'>Whats on now</Link>
            </div>
          </div>
          <img className='main-image' src={mainImage} />
        </div>
        <div id='events'></div>
        <div className='event-container'>
          <div className='form__group field'>
            <input className='form__field' type="text" id="filter"
              placeholder='Search events'
              value={filterValue}
              onChange={handleChange} />
            <label htmlFor="filter" className="form__label">Search events</label>
          </div>
          {data.map((info, index) => {
            return <Card
              info={info}
              key={index}
            />
          })}
        </div>
      </div>
    </div>
  );
}

export { Landing as default };

