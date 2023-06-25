import { Button, ListGroup, Offcanvas } from "react-bootstrap";
import { Link } from "react-router-dom";

export function AdminOffCanvas({ showAdminCanvas, handleCanvasClose, admin }) {

  function logout(event) {
    event.preventDefault();
    console.log("Logout!");
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
            <Button variant={'danger'} onClick={logout}>Kijelentkezés</Button>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}