import { types } from '../types/types';

const initialState = {
  isChecking: true,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.loggedIn:
      return {
        ...state,
        isChecking: false,
        user: action.payload,
      };

    case types.checkedAuth:
      return {
        ...state,
        isChecking: false,
      };

    case types.logOut:
      return {
        isChecking: false,
      };

    default:
      return state;
  }
};
