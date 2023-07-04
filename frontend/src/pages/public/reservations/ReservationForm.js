import '../../../public/css/ReservationForm.css'
import axios from "axios";
import { Form, Button, Row } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';


export function ReservationForm({ selectedInterval, numOfGuests, interval }) {
  const navigate = useNavigate();

  function sendNewReservation(event) {
    event.preventDefault();
    const newReservation = {
      name: event.target.elements.name.value,
      email: event.target.elements.email.value,
      phone: event.target.elements.phone.value,
      date: selectedInterval.date,
      start: selectedInterval.from,
      numOfGuests: numOfGuests,
      interval: interval
    }


    axios.post('/reservation/new', newReservation)
      .then(() => {
        localStorage.removeItem("freeIntervals");
        navigate('/reserve/success')
      })
      .catch(() => navigate('/reserve/fail')) 
  }


  return (
    <Row className="mt-5 mb-5" id='reservation-form'>
      <h3 className="text-center mb-4">Adatok kitöltése</h3>
      <Form onSubmit={sendNewReservation}>
        <Form.Group controlId="name" className="mt-3">
          <Form.Label>Foglaló neve</Form.Label>
          <Form.Control
            type="text"
            placeholder="Adja meg a nevét"
            name="name"
            required
          />
        </Form.Group>

        <Form.Group controlId="email" className="mt-3">
          <Form.Label>Email cím</Form.Label>
          <Form.Control
            type="email"
            placeholder="Adja meg az email címét"
            name="email"
            required
          />
        </Form.Group>

        <Form.Group controlId="phone" className="mt-3">
          <Form.Label>Telefonszám</Form.Label>
          <Form.Control
            type="tel"
            placeholder="Adja meg a telefonszámát"
            name="phone"
            required
          />
        </Form.Group>
        <div className="text-center">

          <Button variant="primary" type="submit" className="mt-5">
            Foglalás elküldése
          </Button>
        </div>
      </Form>
    </Row>
  )
}