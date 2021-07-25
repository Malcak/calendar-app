import React, { useState } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { useDispatch, useSelector } from 'react-redux';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import { Navbar } from '../ui/Navbar';
import { AddNewFab } from '../ui/AddNewFab';
import { EditFab } from '../ui/EditFab';
import { CalendarEvent } from './CalendarEvent';
import { CalendarModal } from './CalendarModal';
import { openModal } from '../actions/ui';
import { setActiveEvent } from '../actions/event';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { DeleteFab } from '../ui/DeleteFab';

const locales = {
  'en-US': require('date-fns/locale/en-US'),
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

  const onSelect = (event) => {
    dispatch(setActiveEvent(event));
  };

  const onDoubleClick = (event) => {
    dispatch(openModal());
  };

  const eventStyleGetter = (event, start, end, isSelected) => {
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
        eventPropGetter={eventStyleGetter}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelect}
        onView={onViewChange}
        components={{ event: CalendarEvent }}
      />
      {!activeEvent ? (
        <AddNewFab />
      ) : (
        <div>
          <EditFab /> <DeleteFab />
        </div>
      )}
      <CalendarModal />
    </div>
  );
};
