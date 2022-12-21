/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  modalType: null,
  itemId: null,
  isOpen: false,
};

const modalsSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    showModal: ((state, action) => {
      const { modalType, itemId } = action.payload;
      state.modalType = modalType;
      state.itemId = itemId;
      state.isOpen = true;
    }),
    hideModal: ((state) => {
      state.modalType = null;
      state.itemId = null;
      state.isOpen = false;
    }),
  },
});

export const { actions } = modalsSlice;
export default modalsSlice.reducer;
