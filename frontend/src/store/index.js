import { configureStore } from '@reduxjs/toolkit';
import channels from './reducers/channels';
import messages from './reducers/messages';

// BEGIN (write your solution here)
export default configureStore({
  reducer: {
    channels,
    messages,
  },
});
