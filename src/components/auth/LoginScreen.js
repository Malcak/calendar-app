import './LoginScreen.css';

import React from 'react';

export const LoginScreen = () => (
  <div className="container login-container">
    <div className="row">
      <div className="col-md-5 login-form-signin me-1">
        <h3>Sign In</h3>
        <form>
          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              placeholder="Email"
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
            />
          </div>
          <button type="submit" className="btn-submit">
            Login
          </button>
        </form>
      </div>

      <div className="col-md-5 login-form-signup">
        <h3>Sign Up</h3>
        <form>
          <div className="mb-3">
            <input type="text" className="form-control" placeholder="Name" />
          </div>
          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              placeholder="Email"
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
            />
          </div>

          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Confirm password"
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
