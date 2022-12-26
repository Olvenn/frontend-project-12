import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import useAuth from '../../hooks/useAuth';

const Layout = ({ children }) => {
  const auth = useAuth();
  const { t } = useTranslation();

  const handleLogOutClick = () => {
    auth.logOut();
  };

  return (
    <div className="h-100">
      <div className="h-100" id="chat">
        <div className="d-flex flex-column h-100">
          <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
            <div className="container">
              <Link className="navbar-brand" to="/">
                Hexlet Chat
              </Link>
              {auth.userName !== 'guest' && (
                <button
                  onClick={handleLogOutClick}
                  type="button"
                  className="btn btn-primary"
                >
                  {t('logout')}
                </button>
              )}
            </div>
          </nav>
          {children}
        </div>
        <div className="Toastify" />
      </div>
    </div>
  );
};

export default Layout;
