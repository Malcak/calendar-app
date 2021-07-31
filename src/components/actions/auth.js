import Swal from 'sweetalert2';

import { fetchWithoutToken, fetchWithToken } from '../../helpers/fetch';
import { types } from '../../types/types';

const handleError = (errors) => {
  const errorKeys = Object.keys(errors);
  if (errorKeys.length === 1) {
    Swal.fire('Error', errors[errorKeys[0]].msg, 'error');
  } else {
    Swal.fire(
      'Error',
      `${errorKeys.reduce((acc, el) => {
        return `${acc}, ${el}`;
      })}, ${errors[errorKeys[0]].msg}`,
      'error'
    );
  }
};

const loggedIn = (user) => ({
  type: types.loggedIn,
  payload: user,
});

export const logIn = (email, password) => {
  return async (dispatch) => {
    const resp = await fetchWithoutToken(
      'users/login',
      { email, password },
      'POST'
    );
    const body = await resp.json();

    if (body.ok) {
      localStorage.setItem('token', body.data.token);
      localStorage.setItem('tokenDate', new Date().getTime());
      dispatch(loggedIn(body.data.user));
    } else {
      handleError(body.errors);
    }
  };
};

export const signingUp = (email, password, name) => {
  return async (dispatch) => {
    const resp = await fetchWithoutToken(
      'users/',
      { email, password, name },
      'POST'
    );
    const body = await resp.json();

    if (body.ok) {
      localStorage.setItem('token', body.data.token);
      localStorage.setItem('tokenDate', new Date().getTime());
      dispatch(loggedIn(body.data.user));
    } else {
      handleError(body.errors);
    }
  };
};

const checkedAuth = () => ({
  type: types.checkedAuth,
});

export const checkAuth = () => {
  return async (dispatch) => {
    const resp = await fetchWithToken('users/renew');
    const body = await resp.json();

    if (body.ok) {
      localStorage.setItem('token', body.data.token);
      localStorage.setItem('tokenDate', new Date().getTime());
      dispatch(loggedIn(body.data.user));
    } else {
      dispatch(checkedAuth());
    }
  };
};

const loggedOut = () => ({
  type: types.logOut,
});

export const logout = () => {
  return (dispatch) => {
    localStorage.clear();
    dispatch(loggedOut());
  };
};
