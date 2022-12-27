/* eslint-disable no-param-reassign */
import { createSlice, createEntityAdapter, current } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
// import { fetchData } from '../api-actions';
// eslint-disable-next-line import/no-cycle
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
      console.log(current(state));
    },
    addMessage: (state, { payload }) => {
      const { message } = payload;
      console.log('addMessage', message);
      messagesAdapter.addOne(state, message);
    },
  },
  extraReducers: (builder) => {
    builder
      // .addCase(channelsActions.setChannels, (state, { payload }) => {
      //   const { messages } = payload;
      //   state.messages = messages;
      //   messagesAdapter.setAll(state, messages);
      // })
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
