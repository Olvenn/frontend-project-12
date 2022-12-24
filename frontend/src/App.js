import {
  BrowserRouter,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import NotFoundPage from './components/not-found-page/not-found-page';
import MainPage from './components/main-page/main-page';
import RegistrationPage from './components/registration/registration';
import Auth from './components/auth/auth';
import useAuth from './hooks/useAuth';
import AuthProvider from './providers/AuthProvider';

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
        <Route path="/" element={<PrivateRoute><MainPage /></PrivateRoute>} />
        <Route path="login" element={<Auth />} />
        <Route path="registration" element={<RegistrationPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  </AuthProvider>
);

export default App;
