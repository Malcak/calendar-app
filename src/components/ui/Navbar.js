import React from 'react';

export const Navbar = () => {
  return (
    <nav className="navbar navbar-dark bg-dark mb-4">
      <div className="container-fluid">
        <span className="navbar-brand mb-0 h1">Name</span>
        <button className="btn btn-outline-danger">
          <span>Exit</span>
          <i className="fas fa-sign-out-alt ms-2"></i>
        </button>
      </div>
    </nav>
  );
};
