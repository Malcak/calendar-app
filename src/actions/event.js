import parseISO from 'date-fns/parseISO';

import { fetchWithToken } from '../helpers/fetch';
import handleError from '../helpers/handleError';
import { types } from '../types/types';

const addedNewEvent = (event) => ({
  type: types.addNewEvent,
  payload: event,
});

export const addNewEvent = (event) => {
  return async (dispatch) => {
    try {
      const resp = await fetchWithToken('events/', event, 'POST');
      const body = await resp.json();

      if (body.ok) {
        body.data.event.startDate = parseISO(body.data.event.startDate);
        body.data.event.endDate = parseISO(body.data.event.endDate);
        dispatch(addedNewEvent(body.data.event));
      } else {
        handleError(body.errors);
      }
    } catch (error) {
      throw new Error(error);
    }
  };
};

const loadedEvents = (events) => ({
  type: types.loadEvents,
  payload: events,
});

export const loadEvents = () => {
  return async (dispatch) => {
    try {
      const resp = await fetchWithToken('events/');
      const body = await resp.json();

      if (body.ok) {
        const events = body.data.events.map((event) => ({
          ...event,
          startDate: parseISO(event.startDate),
          endDate: parseISO(event.endDate),
        }));
        dispatch(loadedEvents(events));
      } else {
        handleError(body.errors);
      }
    } catch (error) {
      throw new Error(error);
    }
  };
};

export const clearEvents = () => ({
  type: types.clearEvents,
});

export const setActiveEvent = (event) => ({
  type: types.setActiveEvent,
  payload: event,
});

export const unsetActiveEvent = () => ({
  type: types.unsetActiveEvent,
});

const updatedEvent = (event) => ({
  type: types.updateEvent,
  payload: event,
});

export const updateEvent = (event) => {
  return async (dispatch) => {
    try {
      const resp = await fetchWithToken(`events/${event._id}`, event, 'PUT');
      const body = await resp.json();

      if (body.ok) {
        body.data.event.startDate = parseISO(body.data.event.startDate);
        body.data.event.endDate = parseISO(body.data.event.endDate);
        dispatch(updatedEvent(body.data.event));
      } else {
        handleError(body.errors);
      }
    } catch (error) {
      throw new Error(error);
    }
  };
};

const deletedEvent = () => ({
  type: types.deleteEvent,
});

export const deleteEvent = (id) => {
  return async (dispatch) => {
    try {
      const resp = await fetchWithToken(`events/${id}`, {}, 'DELETE');
      const body = await resp.json();

      if (body.ok) {
        dispatch(deletedEvent());
      } else {
        handleError(body.errors);
      }
    } catch (error) {
      throw new Error(error);
    }
  };
};
