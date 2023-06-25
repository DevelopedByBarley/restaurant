import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';

export function Navigation() {
  return (
    <>

      <Navbar key={'sm'} expand={'sm'} className="mb-3 bg-secondary">
        <Container fluid>
          <Navbar.Brand href="#" className='text-light'>Brand</Navbar.Brand>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${'sm'}`} />
          <Navbar.Offcanvas
            style={{ background: "hsla(37, 100%, 50%, 1)" }}
            id={`offcanvasNavbar-expand-${'sm'}`}
            aria-labelledby={`offcanvasNavbarLabel-expand-${'sm'}`}
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title className='text-light' id={`offcanvasNavbarLabel-expand-${'sm'}`}>
                Offcanvas
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-center flex-grow-1 pe-3">
                <Nav.Link href="#action1" className='text-light'>Home</Nav.Link>
                <Nav.Link href="#action2" className='text-light'>Link</Nav.Link>
                <Nav.Link href="#action2" className='text-light'>Link</Nav.Link>
                <Nav.Link href="#action2" className='text-light'>Link</Nav.Link>
                <Nav.Link href="#action2" className='text-light'>Link</Nav.Link>
              </Nav>
              { localStorage.getItem('accessToken') !== null && <Navbar.Text> Signed in as: <a href="#login">Mark Otto</a></Navbar.Text> }
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  );
}

