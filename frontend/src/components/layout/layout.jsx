import { Outlet } from 'react-router-dom';

const Layout = () => (
  <div className="h-100">
    <div className="h-100" id="chat">
      <div className="d-flex flex-column h-100">
        <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
          <div className="container">
            <a className="navbar-brand" href="/">
              Hexlet Chat
            </a>
          </div>
        </nav>
        <Outlet />
      </div>
      <div className="Toastify" />
    </div>
  </div>
);

export default Layout;
