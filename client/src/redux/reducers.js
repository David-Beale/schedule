import { combineReducers } from 'redux';

const eventsReducer = (
  state = {
    events: [],
    myEvents: []
  },
  { type, payload }
) => {
  switch (type) {
    case 'getEvents': {
      return {
        ...state,
        events: [...payload.eventList] || []
      };
    }
    case 'postEvent': {
      return {
        ...state,
        events: [...state.events, payload]
      };
    }
    case 'deleteEvent': {
      const removeSpecifiedEvent = (event) => !event._id.equals(payload._id);

      return {
        ...state,
        events: state.events.filter(removeSpecifiedEvent)
      };
    }
    case 'setEventStatus': {
      const updateEventStatus = (event) => {
        const isThisEvent = event._id === payload.id;
        return isThisEvent ? { ...event, status: payload.status } : event;
      };
      return {
        ...state,
        events: state.events.map(updateEventStatus)
      };
    }
    case 'getEventsByUserId': {
      return {
        ...state,
        myEvents: [...payload.eventList] || []
      };
    }
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  eventsReducer
});

export default rootReducer;
