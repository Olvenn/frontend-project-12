import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { io } from 'socket.io-client';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import leoProfanity from 'leo-profanity';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import store from './store/index';
import initSocketApi from './store/api-actions';
import AuthContext from './contexts/socketContext';
import I18Provider from './providers/I18nextProvider';
import './index.css';
import App from './App';

const isProd = process.env.NODE_ENV === 'production';

const initApp = () => {
  const socket = io();
  const api = initSocketApi(socket, store);

  const filter = leoProfanity;
  filter.clearList();
  filter.add(leoProfanity.getDictionary('ru'));
  filter.add(leoProfanity.getDictionary('en'));

  const rollbarConfig = {
    enabled: isProd,
    accessToken: process.env.ROLLBAR_TOKEN,
    captureUncaught: true,
    captureUnhandledRejections: true,
    payload: {
      environment: 'production',
    },
  };

  return (
    <React.StrictMode>
      <RollbarProvider config={rollbarConfig}>
        <ErrorBoundary>
          <Provider store={store}>
            <I18Provider>
              <AuthContext.Provider value={api}>
                <App />
              </AuthContext.Provider>
            </I18Provider>
          </Provider>
        </ErrorBoundary>
      </RollbarProvider>
    </React.StrictMode>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(initApp());
