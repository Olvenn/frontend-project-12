import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
// import { api } from './index.js';
// import store from './store';
import routes from '../routes';

const getAuthHeader = () => {
  const currentUser = JSON.parse(localStorage.getItem('user'));
  if (currentUser && currentUser.token) {
    console.log(currentUser.token);
    return { Authorization: `Bearer ${currentUser.token}` };
  }
  return {};
};

export const fetchData = createAsyncThunk(
  'tasks/fetchTasks',
  async () => {
    const response = await axios.get(routes.dataPath(), { headers: getAuthHeader() });
    console.log('response', response.data);

    return response.data;
  },
);

export const sendTask = createAsyncThunk(
  'tasks/sendTask',
  async (task) => {
    const { data } = await axios.post(routes.tasksPath(), task);
    return data;
  },
);

const createSockertApi = (socket) => {
  socket.emit("update item", "1", { name: "updated" }, (response) => {
    console.log(response.status); // ok
  });

  socket.on('newMessage', (payload) => {
    console.log(payload); // => { body: "new message", channelId: 7, id: 8, username: "admin" }
  });

  // emit new message
  socket.emit('newMessage', { body: "message text", channelId: 1, username: 'admin' });

  // subscribe new channel
  socket.on('newChannel', (payload) => {
    console.log(payload) // { id: 6, name: "new channel", removable: true }
  });

  // emit new channel
  socket.emit('newChannel', { name: "new channel" });

  // subscribe remove channel
  socket.on('removeChannel', (payload) => {
    console.log(payload); // { id: 6 };
  });

  // emit remove channel
  socket.emit('removeChannel', { id: 6 });

  // subscribe rename channel
  socket.on('renameChannel', (payload) => {
    console.log(payload); // { id: 7, name: "new name channel", removable: true }
  });

  // emit rename channel
  socket.emit('renameChannel', { id: 7, name: "new name channel" });
};
