import { types } from '../../types/types';

describe('test on action types', () => {
  test('should be equal', () => {
    expect(types).toEqual({
      openModal: '@ui/openModal',
      closeModal: '@ui/closeModal',

      addNewEvent: '@event/addNewEvent',
      loadEvents: '@event/loadEvents',
      clearEvents: '@event/clearEvents',
      setActiveEvent: '@event/setActiveEvent',
      unsetActiveEvent: '@event/unsetActiveEvent',
      updateEvent: '@event/updateEvent',
      deleteEvent: '@event/deleteEvent',

      checkedAuth: '@auth/chekedAuth',
      loggedIn: '@auth/loggedIn',
      logOut: '@auth/logout',
    });
  });
});
