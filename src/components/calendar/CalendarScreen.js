import 'react-big-calendar/lib/css/react-big-calendar.css';

import format from 'date-fns/format';
import getDay from 'date-fns/getDay';
import localUS from 'date-fns/locale/en-US';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import React, { useState } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { useDispatch, useSelector } from 'react-redux';

import { setActiveEvent, unsetActiveEvent } from '../../actions/event';
import { openModal } from '../../actions/ui';
import { AddNewFab } from '../ui/AddNewFab';
import { DeleteFab } from '../ui/DeleteFab';
import { EditFab } from '../ui/EditFab';
import { Navbar } from '../ui/Navbar';
import { CalendarEvent } from './CalendarEvent';
import { CalendarModal } from './CalendarModal';

const locales = {
  'en-US': localUS,
};
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

export const CalendarScreen = () => {
  const dispatch = useDispatch();
  const { events, activeEvent } = useSelector((state) => state.event);

  const [lastView, setLastView] = useState(
    localStorage.getItem('lastView') || 'month'
  );

  const onViewChange = (view) => {
    setLastView(view);
    localStorage.setItem('lastView', view);
  };

  const onSelectSlot = () => {
    dispatch(unsetActiveEvent());
  };

  const onSelect = (event) => {
    dispatch(setActiveEvent(event));
  };

  const onDoubleClick = () => {
    dispatch(openModal());
  };

  const eventStyleGetter = () => {
    const style = {
      backgroundColor: '#367CF7',
      borderRadius: 0,
      opacity: 0.8,
      display: 'block',
      color: 'white',
    };
    return { style };
  };

  return (
    <div className="calendar-screen">
      <Navbar />
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="startDate"
        endAccessor="endDate"
        view={lastView}
        selectable
        eventPropGetter={eventStyleGetter}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelect}
        onSelectSlot={onSelectSlot}
        onView={onViewChange}
        components={{ event: CalendarEvent }}
      />
      {!activeEvent ? (
        <AddNewFab />
      ) : (
        <div>
          <EditFab />
          <DeleteFab />
        </div>
      )}
      <CalendarModal />
    </div>
  );
};
