import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
// import { fetchData } from '../api-actions';

const messagesAdapter = createEntityAdapter();

const initialState = messagesAdapter.getInitialState();

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessages: messagesAdapter.addMany,
    addMessage: messagesAdapter.addOne,
  },
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(fetchData.fulfilled, (state, action) => {
  //       const { messages } = action.payload;
  //       messagesAdapter.setAll(state, messages);
  //       // console.log('messages', messages);
  //     });
  // },
});

export const { actions } = messagesSlice;
export const selectors = messagesAdapter.getSelectors((state) => state.messages);
export default messagesSlice.reducer;
