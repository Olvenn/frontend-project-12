/* eslint-disable no-param-reassign */
import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const channelsAdapter = createEntityAdapter();

const DEFAULI_ID = 1;

const initialState = channelsAdapter.getInitialState({
  currentChannelId: DEFAULI_ID,
  changedChannelId: null,
});

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    setChannels: (state, { payload }) => {
      channelsAdapter.setAll(state, payload.channels);
    },
    createChannel: (state, action) => {
      channelsAdapter.addOne(state, action);
    },
    setCurrentChannelId: ((state, action) => {
      state.currentChannelId = action.payload;
    }),
    setChangedChannelId: ((state, action) => {
      state.changedChannelId = action.payload;
    }),
    renameChannel: ((state, { payload }) => {
      const { channel } = payload;
      const { id, name } = channel;
      const newChannel = {
        id,
        changes: {
          name,
        },
      };
      channelsAdapter.updateOne(state, newChannel);
      if (id === state.currentChannelId) {
        state.currentChannelId = DEFAULI_ID;
      }
    }),
    removeChannel: ((state, { payload }) => {
      const { channel } = payload;
      const { id } = channel;
      channelsAdapter.removeOne(state, id);
      if (id === state.currentChannelId) {
        state.currentChannelId = DEFAULI_ID;
      }
    }),
  },
});

export const { actions } = channelsSlice;
export const selectors = channelsAdapter.getSelectors((state) => state.channels);
export default channelsSlice.reducer;
