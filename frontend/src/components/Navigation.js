import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Link } from 'react-router-dom';

export function Navigation({ admin }) {


  return (
    <>

      <Navbar key={'sm'} expand={'sm'} className="mb-3 bg-secondary">
        <Container fluid>
          <Link to={"/"}>
            <Navbar.Brand className='text-light'>Brand</Navbar.Brand>
          </Link>
          <Navbar.Toggle className='bg-light' aria-controls={`offcanvasNavbar-expand-${'sm'}`} />
          <Navbar.Offcanvas
            className="bg-secondary"
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
                <Nav.Link href="#action1" className='text-light'>Kezdőlap</Nav.Link>
                <Nav.Link href="#action2" className='text-light'>Étlap</Nav.Link>
                <Nav.Link href="#action2" className='text-light'>Itallap</Nav.Link>
                <Nav.Link href="/reserve" className='text-light'>Asztal foglalás</Nav.Link>
              </Nav>
              {admin && <Link to={"/admin"} className='mt-2'>
                <Navbar.Text className='text-light rounded p-2 bg-warning'> Admin bejelentkezve: {admin?.name}</Navbar.Text>
              </Link>}
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  );
}

