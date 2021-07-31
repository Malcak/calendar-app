import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import capitalizeFirstLetter from '../../helpers/capitalize';
import { logout } from '../actions/auth';

export const Navbar = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className="navbar navbar-dark bg-dark mb-4">
      <div className="container-fluid">
        <span className="navbar-brand mb-0 h1">
          {capitalizeFirstLetter(user.name)}
        </span>
        <button
          type="button"
          className="btn btn-outline-danger"
          onClick={handleLogout}
        >
          <span>Exit</span>
          <i className="fas fa-sign-out-alt ms-2" />
        </button>
      </div>
    </nav>
  );
};
