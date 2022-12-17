import {
  BrowserRouter,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import NotFoundPage from './components/not-found-page/not-found-page';
import MainPage from './components/main-page/main-page';
import Auth from './components/auth/auth';
// import PrivateRoute from './components/private-route/private-route';
import useAuth from './hooks/index';
import AuthProvider from './providers/AuthProvider';

// const AuthProvider = ({ children }) => {
//   const [loggedIn, setLoggedIn] = useState(false);

//   const logIn = () => setLoggedIn(true);
//   const logOut = () => {
//     localStorage.removeItem('userId');
//     setLoggedIn(false);
//   };

//   return (
//     // eslint-disable-next-line react/jsx-no-constructed-context-values
//     <AuthContext.Provider value={{ loggedIn, logIn, logOut }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

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
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  </AuthProvider>
);

export default App;
