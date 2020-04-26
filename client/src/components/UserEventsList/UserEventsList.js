import React, { useEffect } from 'react';
import { getCurrentUser } from '../../stitch/authentication';
import { useDispatch } from 'react-redux';
import { loadEventsByUserId, removeEvent } from '../../redux/actions';
import { useSelector } from 'react-redux';
import OwnCard from '../OwnCard/OwnCard';
import './UserEventsList.css';

function UserEventsList() {
  const dispatch = useDispatch();
  const data = useSelector(({ eventsReducer }) => eventsReducer.myEvents);
  const user = getCurrentUser().id;

  useEffect(() => {
    dispatch(loadEventsByUserId(user));
  }, []);

  const handleDelete = (id) => {
    dispatch(removeEvent(id));
    dispatch(loadEventsByUserId(user));
  };

  return (
    <div className="event-container">
      {data.length > 0 ? (
        data.map((info, index) => {
          return (
            <OwnCard
              info={info.eventData}
              key={index}
              id={info._id}
              handleDelete={handleDelete}
            />
          );
        })
      ) : (
        <div className="event-alert"> No events!</div>
      )}
    </div>
  );
}

export default UserEventsList;
