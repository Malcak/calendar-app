import 'react-tiny-fab/dist/styles.css';

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Fab } from 'react-tiny-fab';
import Swal from 'sweetalert2';

import { deleteEvent } from '../actions/event';

export const DeleteFab = () => {
  const dispatch = useDispatch();
  const { activeEvent } = useSelector((state) => state.event);

  const handleClick = () => {
    Swal.fire({
      title: 'Are you sure you want to delete the event?',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      icon: 'question',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteEvent(activeEvent._id));
      }
    });
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
