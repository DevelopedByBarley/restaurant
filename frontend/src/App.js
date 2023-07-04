
import 'bootstrap/dist/css/bootstrap.min.css';

import { Route, Routes } from 'react-router-dom';
import { LoginForm } from './pages/public/admin/LoginForm';
import { Dashboard } from './pages/protected/admin/Dashboard';
import { fetchAuthentication } from './helpers/AuthService';
import { useEffect, useState } from 'react';
import { Navigation } from './components/Navigation';
import { MainPage } from './pages/public/main/MainPage';
import { Container } from 'react-bootstrap';
import { Reserve } from './pages/public/reservations/Reserve';
import { Intervals } from './pages/public/reservations/Intervals';
import { ReservationSuccess } from './pages/public/reservations/ReservationSuccess';
import { ReservationFail } from './pages/public/reservations/ReservationFail';


function App() {
  const [admin, setAdmin] = useState('');
  const [reservation, setReservation] = useState([]);
  const [freeIntervals, setFreeIntervals] = useState([]);


  useEffect(() => {
    fetchAuthentication.get('/admin/getMe')
      .then((res) => {
        setAdmin(res.data.admin)
      })
      .catch((err) => {
        console.error(err);
        localStorage.removeItem('accessToken');
      });
  }, [])


  return (
    <>
      <Navigation admin={admin} />
      <Container>
        <Routes>
          <Route path='/' element={<MainPage />} />
          <Route path='/reserve'>
            <Route path='' element={<Reserve setReservation={setReservation} reservation={reservation} setFreeIntervals={setFreeIntervals} />} />
            <Route path='intervals' element={<Intervals reservation={reservation} freeIntervals={freeIntervals} setFreeIntervals={setFreeIntervals}/>} />
            <Route path='success' element={<ReservationSuccess />} />
            <Route path='failed' element={<ReservationFail />} />
          </Route>
          <Route path='/admin'>
            <Route path='' element={<LoginForm admin={admin} />} />
            <Route path='dashboard' element={<Dashboard setAdmin={setAdmin} admin={admin} />} />
          </Route>
        </Routes>
      </Container>
    </>
  );
}

export default App;