import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { useRollbar } from '@rollbar/react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import Layout from '../layout/layout';
import { actions as channelAction } from '../../store/reducers/channels';
import { actions as messageAction } from '../../store/reducers/messages';
import Channels from '../channels/channels';
import Messages from '../messages/messages';
import routes from '../../routes';
import Modals from '../modals/modal';

const MainPage = () => {
  const dispatch = useDispatch();
  const rollbar = useRollbar();
  const { t } = useTranslation();

  const getAuthHeader = () => {
    const currentUser = JSON.parse(localStorage.getItem('user'));
    if (currentUser && currentUser.token) {
      return { Authorization: `Bearer ${currentUser.token}` };
    }
    return {};
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(routes.dataPath(), { headers: getAuthHeader() });
        console.log(response.data);

        dispatch(channelAction.setChannels(response.data));
        dispatch(messageAction.setMessages(response.data));
      } catch (error) {
        rollbar.error(error);
        if (!error.isAxiosError) {
          toast.error(t('errors.unknown'));
          return;
        }
        toast.error(t('errors.network'));
      }
    };

    fetchData();
  });

  return (
    <Layout>
      <div className="container h-100 my-4 overflow-hidden rounded shadow">
        <Modals />
        <div className="row h-100 bg-white flex-md-row">
          <Channels />
          <Messages />
        </div>
      </div>
    </Layout>
  );
};

export default MainPage;
