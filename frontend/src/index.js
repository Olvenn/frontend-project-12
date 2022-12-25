import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { io } from 'socket.io-client';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import { store } from './store/index';
import { initSocketApi } from './store/api-actions';
import AuthContext from './contexts/socketContext';
import I18Provider from './providers/I18nextProvider';
import './index.css';
import App from './App';

const initApp = () => {
  const socket = io();
  const api = initSocketApi(socket, store);

  return (
    <React.StrictMode>
      <Provider store={store}>
        <I18Provider>
          <AuthContext.Provider value={api}>
            <App />
          </AuthContext.Provider>
        </I18Provider>
      </Provider>
    </React.StrictMode>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(initApp());
// root.render(
//   <React.StrictMode>
//     <Provider store={store}>
//       <App />
//     </Provider>
//   </React.StrictMode>,
// );
