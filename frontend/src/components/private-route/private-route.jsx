import { useNavigate } from 'react-router-dom';
import React, { useContext } from 'react';
import authContext from '../contexts/index.jsx';

const PrivateRoute = ({ children }) => {
  const navigate = useNavigate();
  const { theme } = useContext(authContext);
  const className = theme.class;
  // const { logIn } = useContext(AuthContext);
  const auth = useAuth();
  // alert(logIn);

  return hasAccess ? children : navigate('/login');
};

export default PrivateRoute;
const PrivateRoute = ({ children }) => {
  const auth = useAuth();
  return auth ? children : <Navigate to="/login" />;
};