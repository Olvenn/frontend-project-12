import { configureStore } from '@reduxjs/toolkit';
import channels from './reducers/channels';
import messages from './reducers/messages';
import modals from './reducers/modals';

const store = configureStore({
  reducer: {
    channels,
    messages,
    modals,
  },
});

export default store;
