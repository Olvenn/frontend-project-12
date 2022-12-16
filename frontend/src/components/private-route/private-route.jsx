import { useNavigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const navigate = useNavigate();
  // const { logIn } = useContext(AuthContext);
  const hasAccess = true;
  // alert(logIn);

  return hasAccess ? children : navigate('/login');
};

export default PrivateRoute;
