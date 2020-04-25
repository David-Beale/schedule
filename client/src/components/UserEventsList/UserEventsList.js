import React, { useState, useEffect } from 'react';
import { getCurrentUser } from '../../stitch/authentication';
import { useSelector } from 'react-redux';


function UserEventsList () {
  const allEvents = useSelector(({ eventsReducer }) => eventsReducer.events);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    if (allEvents) {
      let array = allEvents.map(event => event.eventData)
      console.log(getCurrentUser());

      console.log(array);
      
    }
  }, [allEvents])

  return (
    <div>
      
    </div>
  )
}

export default UserEventsList;