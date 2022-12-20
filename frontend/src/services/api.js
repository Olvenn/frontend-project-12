/* eslint-disable no-param-reassign */
import axios from 'axios';
import { getToken } from './token';

const BACKEND_URL = '/api/v1';
const REQUEST_TIMEOUT = 5000;

const createAPI = () => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
  });
  // Authorization: `Bearer ${currentUser.token}`
  axios.interceptors.request.use(async (config) => {
    const token = getToken();
    if (token) {
      config.headers = {
        Authorization: `Bearer ${token}`,
      };
    }
    return config;
  });

  return api;
};

export default createAPI;
