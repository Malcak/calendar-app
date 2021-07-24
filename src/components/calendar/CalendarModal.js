import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-modal';
import DateTimePicker from 'react-datetime-picker';
import startOfHour from 'date-fns/startOfHour';
import compareAsc from 'date-fns/compareAsc';
import add from 'date-fns/add';
import Swal from 'sweetalert2';
import { useForm } from '../../hooks/useForm';
import { closeModal } from '../actions/ui';
import { addNewEvent } from '../actions/event';

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

export const CalendarModal = () => {
  const dispatch = useDispatch();
  const { modalOpen } = useSelector((state) => state.ui);

  const [formValues, handleInputChange] = useForm({
    startDate: startOfHour(add(new Date(), { hours: 1 })),
    endDate: startOfHour(add(new Date(), { hours: 2 })),
    title: '',
    notes: '',
  });

  const [titleValid, setTitleValid] = useState(true);

  const { startDate, endDate, title, notes } = formValues;

  const handleStartDateChange = (value) => {
    handleInputChange({ target: { name: 'startDate', value: value } });
  };

  const handleEndDateChange = (value) => {
    handleInputChange({ target: { name: 'endDate', value: value } });
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
    dispatch(addNewEvent({ ...formValues }));
    onRequestClose();
  };

  const onRequestClose = () => {
    dispatch(closeModal());
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
          <h1> New Event </h1>
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
            ></textarea>
            <small className="form-text text-muted">
              Additional information
            </small>
          </div>
          <div className="d-grid gap-1">
            <button type="submit" className="btn btn-outline-primary">
              <span className="me-2">Save</span>
              <i className="far fa-save"></i>
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
