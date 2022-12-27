// import axios from 'axios';
// import { createAsyncThunk } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { actions as channelsActions } from './reducers/channels';
// eslint-disable-next-line import/no-cycle
import { actions as messagesActions } from './reducers/messages';
// import routes from '../routes';
// eslint-disable-next-line import/no-cycle
// import mainStore from './index';

const acknowledgeWithTimeout = (onSuccess, onTimeout) => {
  /* eslint-disable functional/no-let */
  let isCalled = false;
  const timerId = setTimeout(() => {
    if (isCalled) return;
    isCalled = true;
    onTimeout();
  }, 2000);
  return (...args) => {
    if (isCalled) return;
    isCalled = true;
    clearTimeout(timerId);
    onSuccess(args);
  };
};

// export const fetchData = createAsyncThunk(
//   'tasks/fetchTasks',
//   async () => {
//     const response = await axios.get(routes.dataPath(), { headers: getAuthHeader() });
//     mainStore.dispatch(channelsActions.setChannels(response.data));
//     return response.data;
//   },
// );

const initSocketApi = (socket, store) => {
  const createEmit = (event) => (message, onSuccess, onTimeout) => {
    socket.emit(event, message, acknowledgeWithTimeout(onSuccess, onTimeout));
  };

  socket.on('newMessage', (payload) => {
    store.dispatch(messagesActions.addMessage({ message: payload }));
  });

  socket.on('newChannel', (payload) => {
    store.dispatch(channelsActions.createChannel({ channel: payload }));
  });

  socket.on('removeChannel', (payload) => {
    store.dispatch(channelsActions.removeChannel({ channel: payload }));
  });

  socket.on('renameChannel', (payload) => {
    store.dispatch(channelsActions.renameChannel({ channel: payload }));
  });

  return {
    sendMessage: createEmit('newMessage'),
    createChannel: createEmit('newChannel'),
    removeChannel: createEmit('removeChannel'),
    renameChannel: createEmit('renameChannel'),
  };
};

export default initSocketApi;
