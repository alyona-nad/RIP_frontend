import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './navbar.css'
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/auth/authActions';
import React, { useState, useEffect } from 'react';
import { RootState } from '../redux/store';
import { useNavigate } from 'react-router-dom';

function BasicExample() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    loggedIn: isAuthenticated,
    name: localStorage.getItem("name") || "",
  });

  const handleLogout = async (e: React.MouseEvent) => {
    e.preventDefault();

    try {
      await dispatch(logout());
      navigate('/RIP_frontend/');
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  useEffect(() => {
    const handleStorageChange = () => {
      setUserData({
        loggedIn: isAuthenticated,
        name: localStorage.getItem("name") || "",
      });
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [isAuthenticated]);

  /*const dispatch = useDispatch();
  const handleLogout = async (e: React.MouseEvent) => {
    e.preventDefault();

    try {
      await dispatch(logout());
      window.location.reload();
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };*/
  return (
    <Navbar bg="light" expand="lg">
      <Container fluid className="new flex-column" style={{width:"100%"}}>
        <Navbar.Brand href="#home" className="brand text-center" style={{fontSize:"2em"}}>Производство красок</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="w-100 d-flex justify-content-center ">
          <Nav className="me-auto">
            <Nav.Link href="#home" className="li mx-3" style={{flex:"1"}}>Главная</Nav.Link>
           {/*{window.localStorage.getItem("accessToken") ? (
              <Link className='li mx-3' to="/RIP_frontend/">
                Каталог
              </Link>
            ) : null}*/}
            <Nav.Link href="/RIP_frontend/" className="li mx-3" style={{flex:"1"}}>Каталог</Nav.Link>
            {window.localStorage.getItem("accessToken") ? (
              <Link className='navbar-link' to="/RIP_frontend/dyes">
                Заявки
              </Link>
            ) : null}

          </Nav>
          <Nav>
          <div className='right-side'>
              {window.localStorage.getItem("accessToken") ? (
                <>
                  {window.localStorage.getItem("name") ? (
                    <div style={{display: 'flex', marginTop: '20%'}}>
                      <p className='navbar-link name'>
                        {localStorage.getItem("name")}
                      </p>
                      <Button variant="white" className='navbar-link danger exit' onClick={handleLogout} href='/RIP_frontend/' style={{ color: 'white' }}>
                        Выйти
                      </Button>
                    </div>
                  ) :
                    <Button variant="white" className='navbar-link danger exit' onClick={handleLogout} href='/RIP_frontend/' style={{ color: 'white' }}>
                      Выйти
                    </Button>
                  }
                </>
              ) : (
                <>
                  <Button variant="white" className='navbar-link' href="/RIP_frontend/login" style={{ color: 'white' }}>
                    Войти
                  </Button>
                  <Button variant="white" className='navbar-link register' href="/RIP_frontend/registration" style={{ color: 'white' }}>
                    Зарегистрироваться
                  </Button>
                </>
              )
              }
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
</Navbar>
  );
}

export default BasicExample;