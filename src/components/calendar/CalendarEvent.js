import PropTypes from 'prop-types';
import React from 'react';

import capitalizeFirstLetter from '../../helpers/capitalize';

export const CalendarEvent = ({ event }) => {
  const { title } = event;

  return (
    <div>
      <strong>{capitalizeFirstLetter(title)}</strong>
    </div>
  );
};

CalendarEvent.propTypes = {
  event: PropTypes.shape({
    title: PropTypes.string.isRequired,
  }).isRequired,
};
