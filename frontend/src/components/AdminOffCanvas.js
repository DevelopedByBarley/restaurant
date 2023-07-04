import { Button, ListGroup, Offcanvas } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { fetchAuthentication } from "../helpers/AuthService";

export function AdminOffCanvas({ showAdminCanvas, handleCanvasClose, admin, setAdmin }) {
  const navigate = useNavigate();
  function logout() {
    fetchAuthentication.get('/admin/logout').then((res) => {
      localStorage.removeItem('accessToken');
      setAdmin('');
      navigate('/admin');
    })
  }

  return (
    <>
      <Offcanvas show={showAdminCanvas} onHide={handleCanvasClose} placement={'start'}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            Admin bejelentkezve: {admin?.name}
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ListGroup>
            <Link onClick={handleCanvasClose}>
              <ListGroup.Item>Nyitvatartás</ListGroup.Item>
            </Link>
            <Link onClick={handleCanvasClose}>
              <ListGroup.Item>Receptek</ListGroup.Item>
            </Link>
            <Link onClick={handleCanvasClose}>
              <ListGroup.Item>Foglalások</ListGroup.Item>
            </Link>
            <Link onClick={handleCanvasClose}>
              <ListGroup.Item>Galléria</ListGroup.Item>
            </Link>
            <Link onClick={handleCanvasClose}>
              <ListGroup.Item>Cikkek</ListGroup.Item>
            </Link>
            <Link onClick={handleCanvasClose}>
              <ListGroup.Item>Statisztikák</ListGroup.Item>
            </Link>
          </ListGroup>
          <div className="text-center mt-4">
            <Button variant={'danger'} onClick={() => {
              handleCanvasClose();
              logout()
            }}>Kijelentkezés</Button>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}