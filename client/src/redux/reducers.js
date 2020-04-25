import { combineReducers } from 'redux';

const eventsReducer = (
  state = {
    events: []
  },
  { type, payload }
) => {
  switch (type) {
    case 'getEvents': {
      return {
        ...state,
        events: [...state.events] || []
      };
    }
    case 'postEvent': {
      const newEvent = {
        ...payload
      };
      return {
        ...state,
        events: [...state.events, newEvent]
      };
    }
    case 'deleteEvent': {
      const removeSpecifiedEvent = (event) => event.id !== payload.id;
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
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  eventsReducer
});

export default rootReducer;
