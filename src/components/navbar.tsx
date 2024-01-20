import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './navbar.css'

function BasicExample() {
  return (
    <Navbar bg="light" expand="lg">
      <Container fluid className="new flex-column" style={{width:"100%"}}>
        <Navbar.Brand href="#home" className="brand text-center" style={{fontSize:"2em"}}>Производство красок</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/RIP_frontend/" className="li mx-3" style={{flex:"1"}}>Каталог</Nav.Link>
          </Nav>
      </Container>
</Navbar>
  );
}

export default BasicExample;
