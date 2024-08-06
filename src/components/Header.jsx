import Container from 'react-bootstrap/Container';
import React, { useEffect } from 'react';

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import { useSelector, useDispatch } from "react-redux";

import {
  getAuthStatus,
  logout,
} from '../store/reducer/authReducer';

const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const authStatus = useSelector(getAuthStatus);

    useEffect(() => {
      if (authStatus === 'loggedout') {
          navigate('/login')
      }
  }, [authStatus, dispatch, navigate])

    const handleLogout = () => {
        dispatch(logout()).unwrap();
    };

    return (<Navbar expand="lg" className="bg-body-tertiary">
    <Container>
      <Navbar.Brand>Penerimaan Negara</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link onClick={() => navigate('/dashboard')}>Dashboard</Nav.Link>
          <Nav.Link onClick={() => navigate('/deposite')}>Setoran</Nav.Link>
          <NavDropdown title="Master" id="basic-nav-dropdown">
            <NavDropdown.Item onClick={() => navigate('/user')}>Pengguna</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Container>

    <div className="d-flex">
      <Button variant="light" onClick={() => handleLogout()}>Keluar</Button>
    </div>
  </Navbar>
);
}

export default Header;