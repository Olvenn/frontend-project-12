/* eslint-disable no-param-reassign */
import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { fetchData } from '../api-actions';

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
    createChannel: (state, { payload }) => {
      const { channel } = payload;
      channelsAdapter.addOne(state, channel);
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
