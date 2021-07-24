import { types } from '../types/types';
import { add } from 'date-fns';

const initialState = {
  events: [
    {
      title: "Boss's bithday",
      start: new Date(),
      end: add(new Date(), { hours: 2 }),
      notes: 'Buy a cake',
      user: {
        _id: '123',
        name: 'Name',
      },
    },
  ],
  activeEvent: null,
};

export const eventReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.addNewEvent:
      return {
        ...state,
        events: [...state.events, action.payload],
        activeEvent: action.payload,
      };

    case types.setActiveEvent:
      return {
        ...state,
        activeEvent: action.payload,
      };

    default:
      return state;
  }
};
