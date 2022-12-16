import {
  BrowserRouter,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import { useState } from 'react';
import NotFoundPage from './components/not-found-page/not-found-page';
import MainPage from './components/main-page/main-page';
import Auth from './components/auth/auth';
import AuthContext from './contexts/index.jsx';
// import PrivateRoute from './components/private-route/private-route';
// import useAuth from './hooks/index';

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);

  const logIn = () => setLoggedIn(true);
  const logOut = () => {
    localStorage.removeItem('userId');
    setLoggedIn(false);
  };

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <AuthContext.Provider value={{ loggedIn, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

const MainPageRoute = () => {
  const auth = true;

  return (
    auth.user ? <MainPage /> : <Navigate to="/login" />
  );
};

const App = () => (
  <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPageRoute />} />
        <Route path="login" element={<Auth />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  </AuthProvider>
);

export default App;
