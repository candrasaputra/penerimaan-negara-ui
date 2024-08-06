import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Form, Button, Row, Col } from 'react-bootstrap';
import {
    login,
    getAuthStatus,
} from '../store/reducer/authReducer';
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const authStatus = useSelector(getAuthStatus);
    const navigate = useNavigate();

    useEffect(() => {
        if (authStatus === 'fulfilled') {
            navigate('/dashboard')
        }
    }, [authStatus, dispatch, navigate])

    const handleSubmit = (event) => {
        event.preventDefault();

        dispatch(login({ username, password })).unwrap()
    };

    return <>
        <Row className="justify-content-md-center mt-5">
            <Col xs={12} md={6}>
            <h2 className="text-center mb-4">Login</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control
                    required
                    type="text"
                    placeholder="Enter username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    required
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100">
                Login
                </Button>
            </Form>
            </Col>
        </Row>
    </>
}

export default Login;
