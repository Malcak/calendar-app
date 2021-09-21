import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Swal from 'sweetalert2';

import { checkAuth, logIn, signingUp } from '../../actions/auth';
import * as fetchModule from '../../helpers/fetch';
import { types } from '../../types/types';

jest.mock('sweetalert2', () => ({
  fire: jest.fn(),
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {};
let store = mockStore(initState);

Storage.prototype.setItem = jest.fn();

describe('test on auth actions', () => {
  beforeEach(() => {
    store = mockStore(initState);
    jest.clearAllMocks();
  });

  test('should be a correct response from a logIn', async () => {
    await store.dispatch(logIn('test@email.com', 'Test123456#'));
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: types.loggedIn,
      payload: {
        _id: '614930f0c8b7360015635628',
        name: 'Test',
        email: 'test@email.com',
      },
    });
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'token',
      expect.any(String)
    );
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'tokenDate',
      expect.any(Number)
    );
  });

  test('should be an incorrect response from a logIn', async () => {
    await store.dispatch(logIn('test@email.com', 'Test123456##'));
    const actions = store.getActions();
    expect(actions).toEqual([]);
    expect(Swal.fire).toHaveBeenCalledWith(
      'Error',
      expect.any(String),
      'error'
    );
  });

  test('should be a correct response from a signUp', async () => {
    fetchModule.fetchWithoutToken = jest.fn(() => ({
      json() {
        return {
          ok: true,
          data: {
            user: {
              _id: 'id123abc',
              name: 'Test',
              email: 'test@email.com',
            },
            token: 'token123abc',
          },
        };
      },
    }));

    await store.dispatch(signingUp('test@email.com', 'Test123456#', 'Test'));
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: types.loggedIn,
      payload: {
        _id: 'id123abc',
        name: 'Test',
        email: 'test@email.com',
      },
    });
    expect(localStorage.setItem).toHaveBeenCalledWith('token', 'token123abc');
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'tokenDate',
      expect.any(Number)
    );
  });

  test('should be a correct response from checkAuth', async () => {
    fetchModule.fetchWithToken = jest.fn(() => ({
      json() {
        return {
          ok: true,
          data: {
            user: {
              _id: 'id123abc',
              name: 'Test',
              email: 'test@email.com',
            },
            token: 'token123abc',
          },
        };
      },
    }));

    await store.dispatch(checkAuth());
    const actions = store.getActions();

    expect(actions[0]).toEqual({
      type: types.loggedIn,
      payload: {
        _id: 'id123abc',
        name: 'Test',
        email: 'test@email.com',
      },
    });

    expect(localStorage.setItem).toHaveBeenCalledWith('token', 'token123abc');
  });
});
