import axios from 'axios';
import { useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { fetchAuthentication } from '../../../helpers/AuthService';


export function LoginForm({ admin }) {
  const navigate = useNavigate();

  function login(event) {
    event.preventDefault();

    let adminData = {
      name: event.target.elements.name.value,
      password: event.target.elements.password.value,
    }

    axios.post('/admin/login', adminData)
      .then(res => {
        if (res.data.accessToken) {
          localStorage.setItem('accessToken', res.data.accessToken)
          navigate('/admin/dashboard')
        }
      })
  }

  useEffect(() => {
    fetchAuthentication.get('/admin/getMe')
      .then(res => {
        if (res.data) {
          navigate('/admin/dashboard')
        }
      })
      .catch((err) => {
        console.error(err);
      })
  }, [navigate])

  console.log(admin);

  return (
    <Form onSubmit={login}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Felhasználó</Form.Label>
        <Form.Control type="text" placeholder="Felhasználó" name='name' />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Jelszó</Form.Label>
        <Form.Control type="password" placeholder="Jelszó" name='password' />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  )
}