import { useEffect } from 'react';
import { fetchAuthentication } from '../../../helpers/AuthService';
import { useNavigate } from 'react-router-dom';


export function Dashboard({ setAdmin, admin }) {
  const navigate = useNavigate();


  useEffect(() => {
    fetchAuthentication.get('/admin/getMe')
      .then((res) => {
        setAdmin(res.data)
      })
      .catch((err) => {
        console.error(err);
        navigate('/admin')
      })
  }, [])




  return (
    <h1>Hello admin!</h1>
  )
}