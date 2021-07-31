import 'react-tiny-fab/dist/styles.css';

import React from 'react';
import { useDispatch } from 'react-redux';
import { Fab } from 'react-tiny-fab';

import { openModal } from '../../actions/ui';

export const EditFab = () => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(openModal());
  };

  return (
    <div>
      <Fab
        mainButtonStyles={{ backgroundColor: '#f0ad4e' }}
        style={{ bottom: 16, right: 16 }}
        icon={<i className="fas fa-pen" />}
        event="click"
        onClick={handleClick}
      />
    </div>
  );
};
