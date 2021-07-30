import 'react-tiny-fab/dist/styles.css';

import React from 'react';
import { useDispatch } from 'react-redux';
import { Fab } from 'react-tiny-fab';

import { deleteEvent } from '../actions/event';

export const DeleteFab = () => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(deleteEvent());
  };

  return (
    <div>
      <Fab
        mainButtonStyles={{ backgroundColor: '#d9534f' }}
        style={{ bottom: 16, left: 16 }}
        icon={<i className="fas fa-trash-alt" />}
        event="click"
        onClick={handleClick}
      />
    </div>
  );
};
