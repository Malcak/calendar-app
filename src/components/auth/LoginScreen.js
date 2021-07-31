import './LoginScreen.css';

import React from 'react';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';

import { logIn, signingUp } from '../../actions/auth';
import { useForm } from '../../hooks/useForm';

export const LoginScreen = () => {
  const dispatch = useDispatch();

  const [loginValues, handleLoginInputChange] = useForm({
    lEmail: '',
    lPassword: '',
  });
  const [regValues, handleRegInputChange] = useForm({
    rName: '',
    rEmail: '',
    rPassword: '',
    rConfPassword: '',
  });

  const { lEmail, lPassword } = loginValues;
  const { rName, rEmail, rPassword, rConfPassword } = regValues;

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(logIn(lEmail, lPassword));
  };

  const handleRegister = (e) => {
    e.preventDefault();

    if (rPassword !== rConfPassword) {
      return Swal.fire('Error', 'Password do not match', 'error');
    }

    dispatch(signingUp(rEmail, rPassword, rName));
  };

  return (
    <div className="container login-container">
      <div className="row">
        <div className="col-md-5 login-form-signin me-1">
          <h3>Sign In</h3>
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                name="lEmail"
                value={lEmail}
                onChange={handleLoginInputChange}
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                name="lPassword"
                value={lPassword}
                onChange={handleLoginInputChange}
              />
            </div>
            <button type="submit" className="btn-submit">
              Login
            </button>
          </form>
        </div>

        <div className="col-md-5 login-form-signup">
          <h3>Sign Up</h3>
          <form onSubmit={handleRegister}>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Name"
                name="rName"
                value={rName}
                onChange={handleRegInputChange}
              />
            </div>
            <div className="mb-3">
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                name="rEmail"
                value={rEmail}
                onChange={handleRegInputChange}
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                name="rPassword"
                value={rPassword}
                onChange={handleRegInputChange}
              />
            </div>

            <div className="mb-3">
              <input
                type="password"
                className="form-control"
                placeholder="Confirm password"
                name="rConfPassword"
                value={rConfPassword}
                onChange={handleRegInputChange}
              />
            </div>
            <button type="submit" className="btn-submit">
              Create Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
