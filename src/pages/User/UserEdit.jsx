import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";

import { Card, Form, Row, Button, Col, Alert } from 'react-bootstrap';
import { useNavigate, useParams } from "react-router-dom";

import {
    updateUser,
    fetchUser,
    getSingleUsers
} from '../../store/reducer/userReducer';

const UserEdit = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(getSingleUsers);
    const { id } = useParams();

    const [error, setError] = useState('');
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');

    const CAN_SAVE = name && username && role;

    useEffect(() => {
        if (user) {
            setName(user?.name);
            setUsername(user?.username);
            setRole(user?.role);
        }
    }, [user]);

    useEffect(() => {
        dispatch(fetchUser(id)).unwrap();
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();

        dispatch(updateUser({ id, payload: {name, username, password, role} })).unwrap()
        .then((result) => {
            navigate(`/user/${id}/detail`)
        })
        .catch((error) => {
            setError(error.message);
        });
    };

    return <Card>
        <Card.Header>Form Tambah Pengguna</Card.Header>
        <Card.Body>
            <Form onSubmit={handleSubmit}>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2">
                    Name
                    </Form.Label>
                    <Col sm="10">
                    <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2">
                    Username
                    </Form.Label>
                    <Col sm="10">
                    <Form.Control type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2">
                    Password
                    </Form.Label>
                    <Col sm="10">
                    <Form.Control type="password" onChange={(e) => setPassword(e.target.value)} />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2">
                        Bulan
                    </Form.Label>
                    <Col sm="10">
                        <Form.Select aria-label="Default select" value={role} onChange={(e) => setRole(e.target.value)}>
                            <option value="AM_PPN" >AM PPN</option>
                            <option value="SPESIALIS_KEUANGAN">Spesialis Keuangan</option>
                        </Form.Select>
                    </Col>
                </Form.Group>

                {
                    error ? <Alert key="alert-error" variant='danger'>
                        {error}
                    </Alert> : ''
                }
                <Button type="submit" disabled={!CAN_SAVE}>Simpan</Button>
            </Form>
        </Card.Body>
    </Card>
}

export default UserEdit;