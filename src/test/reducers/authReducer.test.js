import { authReducer } from '../../reducers/authReducer';
import { types } from '../../types/types';

describe('test on auth reducer', () => {
  const initialState = {
    isChecking: true,
  };

  test('should return the default state', () => {
    const state = authReducer(initialState, {});
    expect(state).toEqual(initialState);
  });

  test('should log in the user', () => {
    const user = {
      _id: 'abc123',
      name: 'Test',
      email: 'test@email.com',
    };

    const action = { type: types.loggedIn, payload: user };
    const state = authReducer(initialState, action);
    expect(state).toEqual({ ...initialState, isChecking: false, user });
  });

  test('should check auth of the user', () => {
    const action = { type: types.checkedAuth };
    const state = authReducer(initialState, action);
    expect(state).toEqual({ ...initialState, isChecking: false });
  });

  test('should log out the user', () => {
    const action = { type: types.logOut };
    const state = authReducer(initialState, action);
    expect(state).toEqual({ isChecking: false });
  });
});
