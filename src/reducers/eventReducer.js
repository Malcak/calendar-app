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
            user: {
              _id: '123',
              name: 'Name',
            },
          },
        ],
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

    default:
      return state;
  }
};
