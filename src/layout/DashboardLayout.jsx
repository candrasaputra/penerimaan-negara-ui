import React, { useEffect } from 'react';
import Header from '../components/Header';
import { useSelector, useDispatch } from "react-redux";
import Container from 'react-bootstrap/Container';
import {
  fetchAuthStatus,
  getAuthStatus,
} from '../store/reducer/authReducer';
import { useNavigate } from "react-router-dom";

function DashboardLayout({ children }) {
  const dispatch = useDispatch();
  const authStatus = useSelector(getAuthStatus);
  const navigate = useNavigate();

  useEffect(() => {
    if (authStatus === 'idle') {
        dispatch(fetchAuthStatus())
    }

    if (authStatus === 'failed') {
        navigate('/login')
    }
  }, [authStatus, dispatch])

  return (
    <>
        <Header />
        <Container className='pt-4'>
            {children}
        </Container>
    </>
  );
}

export default DashboardLayout;
