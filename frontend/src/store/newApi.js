import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { actions as channelsActions } from './reducers/channels';
// eslint-disable-next-line import/no-cycle
// import { actions as messagesActions } from './reducers/messages';
import routes from '../routes';
// eslint-disable-next-line import/no-cycle
import store from './index';

const getAuthHeader = () => {
  const currentUser = JSON.parse(localStorage.getItem('user'));
  if (currentUser && currentUser.token) {
    return { Authorization: `Bearer ${currentUser.token}` };
  }
  return {};
};

const fetchData2 = createAsyncThunk(
  'tasks/fetchTasks',
  async () => {
    const response = await axios.get(routes.dataPath(), { headers: getAuthHeader() });
    store.dispatch(channelsActions.setNew(response.data));
    console.log(response);

    // return response.data;
  },
);

export default fetchData2;
