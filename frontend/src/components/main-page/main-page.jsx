import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchData } from '../../store/api-actions';
import Layout from '../layout/layout';
import useSocket from '../../hooks/useSocket';
import { actions as channelsActions } from '../../store/reducers/channels';
import Channels from '../channels/channels';
import Messages from '../messages/messages';
import Modals from '../modals/modal';

const MainPage = () => {
  const dispatch = useDispatch();
  const channelApi = useSocket();

  const handleClick = () => {
    channelApi.createChannel(
      { name: 'New Channel 3' },
      (result) => dispatch(channelsActions.createChannel(result[0].data)),
      () => { console.log('error'); },
    );
  };

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  return (
    <Layout>
      <div className="container h-100 my-4 overflow-hidden rounded shadow">
        <Modals />
        <div className="row h-100 bg-white flex-md-row">
          <Channels />
          <div className="col p-0 h-100">
            <div className="d-flex flex-column h-100">
              <div className="bg-light mb-4 p-3 shadow-sm small">
                <p className="m-0">
                  <b>
                    # general
                  </b>
                </p>
                <span className="text-muted">
                  0 сообщений
                </span>
                <button onClick={handleClick} type="button">Temp</button>
              </div>
              <Messages />
              <div className="mt-auto px-5 py-3">
                <form noValidate="" className="py-1 border rounded-2">
                  <div className="input-group has-validation">
                    <input
                      name="body"
                      aria-label="Новое сообщение"
                      placeholder="Введите сообщение..."
                      className="border-0 p-0 ps-2 form-control"
                    // value=""
                    />
                    <button
                      type="submit"
                      disabled=""
                      className="btn btn-group-vertical"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
                        <path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" />
                      </svg>
                      <span className="visually-hidden">Отправить</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MainPage;
