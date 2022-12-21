import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { io } from 'socket.io-client';
import 'bootstrap/dist/css/bootstrap.min.css';
import { store } from './store/index';
import { initSocketApi } from './store/api-actions';
import AuthContext from './contexts/socketContext';
import './index.css';
import App from './App';

const initApp = () => {
  const socket = io();
  const api = initSocketApi(socket, store);

  return (
    <React.StrictMode>
      <Provider store={store}>
        <AuthContext.Provider value={api}>
          <App />
        </AuthContext.Provider>
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
