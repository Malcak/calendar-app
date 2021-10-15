import { closeModal, openModal } from '../../actions/ui';
import { uiReducer } from '../../reducers/uiReducer';

describe('test on ui reducer', () => {
  const initialState = {
    modalOpen: false,
  };

  test('should return the default state', () => {
    const state = uiReducer(initialState, {});
    expect(state).toEqual(initialState);
  });

  test('should open and close the modal', () => {
    const uiOpenModal = openModal();
    const stateOpen = uiReducer(initialState, uiOpenModal);
    expect(stateOpen).toEqual({ ...initialState, modalOpen: true });

    const uiCloseModal = closeModal();
    const stateClose = uiReducer(initialState, uiCloseModal);
    expect(stateClose).toEqual({ ...initialState, modalOpen: false });
  });
});
