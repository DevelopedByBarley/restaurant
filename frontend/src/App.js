
import 'bootstrap/dist/css/bootstrap.min.css';

import { Route, Routes, useNavigate } from 'react-router-dom';
import { LoginForm } from './pages/public/admin/LoginForm';
import { Dashboard } from './pages/protected/admin/Dashboard';
import { fetchAuthentication } from './helpers/AuthService';
import { useEffect, useState } from 'react';
import { Navigation } from './components/Navigation';
import { MainPage } from './pages/public/main/MainPage';


function App() {
  const [admin, setAdmin] = useState();


  useEffect(() => {
    fetchAuthentication.get('/admin/getMe')
      .then((res) => {
        setAdmin(res.data)
      })
      .catch((err) => {
        console.error(err);
        localStorage.removeItem('accessToken');
      })
  }, [])


  return (
    <>
      <Navigation />
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/admin'>
          <Route path='' element={<LoginForm admin={admin} />} />
          <Route path='dashboard' element={<Dashboard setAdmin={setAdmin} admin={admin} />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;