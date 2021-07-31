import add from 'date-fns/add';
import compareAsc from 'date-fns/compareAsc';
import startOfHour from 'date-fns/startOfHour';
import React, { useEffect, useState } from 'react';
import DateTimePicker from 'react-datetime-picker';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';

import { useForm } from '../../hooks/useForm';
import { addNewEvent, unsetActiveEvent, updateEvent } from '../actions/event';
import { closeModal } from '../actions/ui';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement('#root');

const initForm = {
  startDate: startOfHour(add(new Date(), { hours: 1 })),
  endDate: startOfHour(add(new Date(), { hours: 2 })),
  title: '',
  notes: '',
};

export const CalendarModal = () => {
  const dispatch = useDispatch();
  const { modalOpen } = useSelector((state) => state.ui);
  const { activeEvent } = useSelector((state) => state.event);

  const [formValues, handleInputChange, reset] = useForm(initForm);
  const { startDate, endDate, title, notes } = formValues;

  const [titleValid, setTitleValid] = useState(true);

  useEffect(() => {
    if (activeEvent) {
      reset({
        startDate: activeEvent.startDate,
        endDate: activeEvent.endDate,
        title: activeEvent.title,
        notes: activeEvent.notes,
      });
    } else {
      reset(initForm);
    }

    /*
    the reset function changes each time the component is redrawn,
    if set as a dependency it would create an infinite loop.
    */
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeEvent]);

  const onRequestClose = () => {
    dispatch(unsetActiveEvent());
    dispatch(closeModal());
  };

  const handleStartDateChange = (value) => {
    handleInputChange({ target: { name: 'startDate', value } });
  };

  const handleEndDateChange = (value) => {
    handleInputChange({ target: { name: 'endDate', value } });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isSameOrAfter = compareAsc(startDate, endDate);
    if (isSameOrAfter === 1 || isSameOrAfter === 0) {
      Swal.fire(
        'Error',
        'The end date must be greater than the start date',
        'error'
      );
      return;
    }
    if (title.trim() < 2) {
      setTitleValid(false);
      return;
    }

    // TODO: do the data saving
    setTitleValid(true);

    if (activeEvent) {
      dispatch(
        updateEvent({
          ...formValues,
          _id: activeEvent._id,
          user: activeEvent.user,
        })
      );
    } else {
      dispatch(addNewEvent({ ...formValues }));
    }

    reset(initForm);
    onRequestClose();
  };

  return (
    <div>
      <Modal
        isOpen={modalOpen}
        onRequestClose={onRequestClose}
        closeTimeoutMS={200}
        style={customStyles}
        className="modal"
        overlayClassName="modal-back"
      >
        <form onSubmit={handleSubmit} className="container">
          <h1>{activeEvent ? 'Edit Event' : 'New Event'}</h1>
          <hr />
          <div className="mb-3">
            <label>Start date and time</label>
            <DateTimePicker
              onChange={handleStartDateChange}
              value={startDate}
              name="startDate"
              className="form-control"
            />
          </div>

          <div className="mb-3">
            <label>End date and time</label>
            <DateTimePicker
              onChange={handleEndDateChange}
              value={endDate}
              name="endDate"
              className="form-control"
            />
          </div>

          <hr />
          <div className="mb-3">
            <label>Title and Notes</label>
            <input
              type="text"
              className={`form-control ${!titleValid && 'is-invalid'}`}
              placeholder="Event title"
              name="title"
              value={title}
              onChange={handleInputChange}
              autoComplete="off"
            />

            <small className="form-text text-muted">A short description</small>
          </div>

          <div className="mb-3">
            <textarea
              type="text"
              className="form-control"
              placeholder="Notes..."
              rows="5"
              name="notes"
              onChange={handleInputChange}
              value={notes}
            />
            <small className="form-text text-muted">
              Additional information
            </small>
          </div>
          <div className="d-grid gap-1">
            <button type="submit" className="btn btn-outline-primary">
              <span className="me-2">Save</span>
              <i className="far fa-save" />
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
