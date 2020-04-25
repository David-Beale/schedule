import React, { useState, useEffect } from 'react';
import { getCurrentUser } from '../../stitch/authentication';
import { useDispatch } from 'react-redux';
import { loadEventsByUserId } from '../../redux/actions';

function UserEventsList () {
  const dispatch = useDispatch();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    dispatch(loadEventsByUserId(getCurrentUser().id))
      .then(events => {
        console.log(events);
      })
  }, []);

  return (
    <div>
      
    </div>
  )
}

export default UserEventsList;