import { useState } from 'react';
import AuthContext from '../contexts/index.jsx';

const AuthProvider = ({ children }) => {
  const localStorageData = JSON.parse(localStorage.getItem('user'));
  const user = localStorageData ? localStorageData.userName : 'guest';
  const [userName, setUserName] = useState(user);
  // alert(JSON.stringify(userName));
  // alert(JSON.parse(token).token);

  const logIn = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setUserName({ username: userData.username });
  };

  const logOut = () => {
    localStorage.removeItem('user');
    setUserName('guest');
  };

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <AuthContext.Provider value={{ userName, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
