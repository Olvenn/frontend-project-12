import { configureStore } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import channels from './reducers/channels';
// eslint-disable-next-line import/no-cycle
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
