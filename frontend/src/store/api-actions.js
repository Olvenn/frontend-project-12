// eslint-disable-next-line import/no-cycle
import { actions as channelsActions } from './reducers/channels';
// eslint-disable-next-line import/no-cycle
import { actions as messagesActions } from './reducers/messages';

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

const initSocketApi = (socket, store) => {
  const createEmit = (event) => (message, onSuccess, onTimeout) => {
    socket.emit(event, message, acknowledgeWithTimeout(onSuccess, onTimeout));
  };

  socket.on('newMessage', (payload) => {
    store.dispatch(messagesActions.addMessage({ message: payload }));
  });

  socket.on('newChannel', (payload) => {
    store.dispatch(channelsActions.createChannel(payload));
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
