import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteEvent } from '../actions/event';

export const DeleteFab = () => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(deleteEvent());
  };

  return (
    <div>
      <button className="btn btn-danger fab-danger" onClick={handleClick}>
        <i class="fas fa-trash-alt"></i>
      </button>
    </div>
  );
};
