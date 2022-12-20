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

// export const removeTask = createAsyncThunk(
//   'tasks/removeTask',
//   async (id) => {
//     await axios.delete(routes.taskPath(id));
//     return id;
//   },
// );
