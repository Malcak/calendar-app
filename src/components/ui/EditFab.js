import React from 'react';
import { useDispatch } from 'react-redux';
import { openModal } from '../actions/ui';

export const EditFab = () => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(openModal());
  };

  return (
    <div>
      <button className="btn btn-primary fab" onClick={handleClick}>
        <i className="fas fa-pen"></i>
      </button>
    </div>
  );
};
