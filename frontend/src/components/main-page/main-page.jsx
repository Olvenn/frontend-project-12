import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchData } from '../../store/api-actions';
import Layout from '../layout/layout';
import Channels from '../channels/channels';
import Messages from '../messages/messages';
import Modals from '../modals/modal';

const MainPage = () => {
  const dispatch = useDispatch();
  // const channelApi = useSocket();

  // const handleClick = () => {
  //   channelApi.createChannel(
  //     { name: 'New Channel 3' },
  //     (result) => dispatch(channelsActions.createChannel(result[0].data)),
  //     () => { console.log('error'); },
  //   );
  // };

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

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
