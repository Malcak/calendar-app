import { types } from '../types/types';

const initialState = {
  events: [],
  activeEvent: null,
};

export const eventReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.addNewEvent:
      return {
        ...state,
        events: [
          ...state.events,
          {
            ...action.payload,
          },
        ],
      };

    case types.loadEvents:
      return {
        ...state,
        events: [...action.payload],
      };

    case types.clearEvents:
      return {
        activeEvent: null,
        events: [],
      };

    case types.setActiveEvent:
      return {
        ...state,
        activeEvent: action.payload,
      };

    case types.unsetActiveEvent:
      return {
        ...state,
        activeEvent: null,
      };

    case types.updateEvent:
      return {
        ...state,
        events: state.events.map((event) =>
          event._id === action.payload._id ? action.payload : event
        ),
      };

    case types.deleteEvent:
      return {
        ...state,
        events: state.events.filter(
          (event) => event._id !== state.activeEvent._id
        ),
        activeEvent: null,
      };

    default:
      return state;
  }
};
