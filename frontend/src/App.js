import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NotFoundPage from './components/not-found-page/not-found-page';
import Auth from './components/auth/auth';
import Layout from './components/layout/layout';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Auth />} />
        <Route path="login" element={<Auth />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default App;
