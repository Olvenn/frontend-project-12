import { configureStore } from '@reduxjs/toolkit';
import createAPI from '../services/api';
import channels from './reducers/channels';
import messages from './reducers/messages';

// BEGIN (write your solution here)

export const api = createAPI();

export const store = configureStore({
  reducer: {
    channels,
    messages,
  },
});
