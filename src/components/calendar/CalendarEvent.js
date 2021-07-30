import PropTypes from 'prop-types';
import React from 'react';

export const CalendarEvent = ({ event }) => {
  const { title, user } = event;

  return (
    <div>
      <strong>{title}</strong>
      <br />
      <span>{user.name}</span>
    </div>
  );
};

CalendarEvent.propTypes = {
  event: PropTypes.shape({
    title: PropTypes.string.isRequired,
    user: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }),
  }).isRequired,
};
