/* eslint-disable no-param-reassign */
import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { fetchData } from '../api-actions';

const channelsAdapter = createEntityAdapter();

const DEFAULI_ID = 1;

const initialState = channelsAdapter.getInitialState({
  currentChannelId: DEFAULI_ID,
});

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    createChannel: channelsAdapter.addOne,
    setCurrentChannelId: ((state, action) => {
      state.currentChannelId = action.payload;
    }),
    changeChannelName: channelsAdapter.updateOne,
    renameChannel: ((state, action) => {
      state.currentChannelId = action.payload;
    }),
    removeChannel: ((state, action) => {
      const { id } = action.payload;
      channelsAdapter.removeOne(state, id);
      if (id === state.currentChannelId) {
        state.currentChannelId = DEFAULI_ID;
      }
    }),
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.fulfilled, (state, action) => {
        const { channels, currentChannelId } = action.payload;
        channelsAdapter.setAll(state, channels);
        state.currentChannelId = currentChannelId;
      });
  },
});

export const { actions } = channelsSlice;
export const selectors = channelsAdapter.getSelectors((state) => state.channels);
export default channelsSlice.reducer;
