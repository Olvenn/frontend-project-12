import { useState } from 'react';
import AuthContext from '../contexts/authContext';

const AuthProvider = ({ children }) => {
  const localStorageData = JSON.parse(localStorage.getItem('user'));
  const user = localStorageData ? localStorageData.username : 'guest';
  const [userName, setUserName] = useState(user);

  const logIn = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setUserName(userData.username);
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
