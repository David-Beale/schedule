import React, { useState, useEffect } from 'react';
import { getCurrentUser } from '../../stitch/authentication';
import { useDispatch } from 'react-redux';
import { loadEventsByUserId, removeEvent } from '../../redux/actions';
import { useSelector } from 'react-redux';
import OwnCard from '../OwnCard/OwnCard';

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
      let array = data.map(event => event)
      setMyEvents(array)
    }
  }, [data])

  const handleDelete = (id) => {
    dispatch(removeEvent(id));
  }

  return (
    <div className='event-container'>
      {myEvents.length > 0 && myEvents.sort((a,b) => b.date - a.date)
        .map((info, index) => {
        return <OwnCard info={info.eventData} id={info._id} key={index} handleDelete={handleDelete} />
      })}
      {/* {data.map((info, index) => {
        return <OwnCard
          info={info.eventData}
          key={index}
          id={info._id}
          handleDelete={handleDelete}
        />
      })} */}
    </div>
  )
}

export default UserEventsList;