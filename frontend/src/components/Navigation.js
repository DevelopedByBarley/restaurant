import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';

export function Navigation({ admin }) {


  return (
    <>

      <Navbar key={'sm'} expand={'sm'} className="mb-3 bg-secondary">
        <Container fluid>
          <Navbar.Brand href="#" className='text-light'>Brand</Navbar.Brand>
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
                <Nav.Link href="#action1" className='text-light'>Home</Nav.Link>
                <Nav.Link href="#action2" className='text-light'>Link</Nav.Link>
                <Nav.Link href="#action2" className='text-light'>Link</Nav.Link>
                <Nav.Link href="#action2" className='text-light'>Link</Nav.Link>
                <Nav.Link href="#action2" className='text-light'>Link</Nav.Link>
              </Nav>
              {admin && <Navbar.Text className='text-light rounded p-2'> Admin bejelentkezve: <a className='text-light' href="/admin/dashboard">{admin?.name}</a></Navbar.Text>}
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  );
}

