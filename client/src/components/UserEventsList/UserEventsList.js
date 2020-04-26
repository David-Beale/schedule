import React, { useState, useEffect } from 'react';
import { getCurrentUser } from '../../stitch/authentication';
import { useDispatch } from 'react-redux';
import { loadEventsByUserId } from '../../redux/actions';
import { useSelector } from 'react-redux';
import Card from '../Card/Card';

function UserEventsList() {
  const dispatch = useDispatch();
  const data = useSelector(({ eventsReducer }) => eventsReducer.myEvents);
  const [myEvents, setMyEvents] = useState([])

  useEffect(() => {
    let user = getCurrentUser().id
    dispatch(loadEventsByUserId(user))
  }, []);

  useEffect(() => {
    if (data) {
      let array = data.map(event => event.eventData)
      setMyEvents(array)
    }
  }, [data])

  return (
    <div className='event-container'>
      {myEvents.length > 0 && myEvents.sort((a,b) => b.date - a.date)
        .map((info, index) => {
        console.log(myEvents)
        return <Card info={info} key={index}/>
      })}
    </div>
  )
}

export default UserEventsList;