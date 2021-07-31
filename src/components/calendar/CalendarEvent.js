import PropTypes from 'prop-types';
import React from 'react';

export const CalendarEvent = ({ event }) => {
  const { title } = event;

  return (
    <div>
      <strong>{title}</strong>
    </div>
  );
};

CalendarEvent.propTypes = {
  event: PropTypes.shape({
    title: PropTypes.string.isRequired,
  }).isRequired,
};
