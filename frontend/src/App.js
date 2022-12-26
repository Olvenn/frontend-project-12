import {
  BrowserRouter,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import NotFoundPage from './components/not-found-page/not-found-page';
import MainPage from './components/main-page/main-page';
import RegistrationPage from './components/registration/registration';
import Auth from './components/auth/auth';
import useAuth from './hooks/useAuth';
import AuthProvider from './providers/AuthProvider';
import AppRoute from './const';

const PrivateRoute = ({ children }) => {
  const auth = useAuth();

  return (
    auth.userName !== 'guest' ? children : <Navigate to="/login" replace />
  );
};

const App = () => (
  <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Root} element={<PrivateRoute><MainPage /></PrivateRoute>} />
        <Route path={AppRoute.Login} element={<Auth />} />
        <Route path={AppRoute.Signup} element={<RegistrationPage />} />
        <Route path={AppRoute.NotFound} element={<NotFoundPage />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  </AuthProvider>
);

export default App;
