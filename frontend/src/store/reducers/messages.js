/* eslint-disable no-param-reassign */
import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { actions as channelsActions } from './channels';

const messagesAdapter = createEntityAdapter();

const initialState = messagesAdapter.getInitialState({
  messages: [],
});

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    setMessages: (state, { payload }) => {
      messagesAdapter.setAll(state, payload.messages);
    },
    addMessage: (state, { payload }) => {
      const { message } = payload;
      messagesAdapter.addOne(state, message);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(channelsActions.removeChannel, (state, action) => {
        const id = action.payload;
        const restEntities = Object.values(state.entities)
          .filter((message) => message.channelId === id)
          .map((message) => message.id);
        messagesAdapter.removeMany(state, restEntities);
      });
  },
});

export const { actions } = messagesSlice;
export const selectors = messagesAdapter.getSelectors((state) => state.messages);
export default messagesSlice.reducer;
