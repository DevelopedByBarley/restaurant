import '../../../public/css/Reserve.css'
import { Row } from 'react-bootstrap';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';

export function Reserve({ setReservation, setFreeIntervals }) {
  const navigate = useNavigate();

  function getFreeIntervals(event) {
    event.preventDefault();
    const reservationData = {
      date: event.target.elements.date.value,
      numOfGuests: event.target.elements.numOfGuests.value,
      interval: event.target.elements.interval.value,
    }

    axios.post('/reservations', reservationData).then(res => {
      setReservation(res.data)
      setFreeIntervals(res.data.freeIntervals);
      localStorage.setItem("freeIntervals", JSON.stringify(res.data.freeIntervals))
      navigate('/reserve/intervals');
    })
  }


  return (
    <Row id='reserve'>
      <Form onSubmit={getFreeIntervals}>
        <h1 className='text-center mt-5 mb-5'>Asztal foglalása</h1>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Dátum kiválasztása</Form.Label>
          <Form.Control type="date" name="date" required />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Hány fő</Form.Label>
          <Form.Control type="number" name='numOfGuests' min={1} defaultValue={1} required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Időtartam</Form.Label>
          <Form.Select name='interval' required>
            <option value="3600">1 óra</option>
            <option value="7200">2 óra</option>
            <option value="10800">3 óra</option>
          </Form.Select>
        </Form.Group>
        <div className='text-center'>
          <Button variant="primary" type="submit">
            Tovább
          </Button>
        </div>
      </Form>
    </Row>
  )
}