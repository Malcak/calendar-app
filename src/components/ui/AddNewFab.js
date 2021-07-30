import 'react-tiny-fab/dist/styles.css';

import React from 'react';
import { useDispatch } from 'react-redux';
import { Fab } from 'react-tiny-fab';

import { openModal } from '../actions/ui';

export const AddNewFab = () => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(openModal());
  };

  return (
    <div>
      <Fab
        mainButtonStyles={{ backgroundColor: '#0275d8' }}
        style={{ bottom: 16, right: 16 }}
        icon={<i className="fas fa-plus" />}
        event="click"
        onClick={handleClick}
      />
    </div>
  );
};
