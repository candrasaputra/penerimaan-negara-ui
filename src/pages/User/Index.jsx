import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";

import { Card, Table, Button } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

import {
    fetchUsers,
    deleteUser,
    getAllUsers
} from '../../store/reducer/userReducer';

const User = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const users = useSelector(getAllUsers);

    useEffect(() => {
        dispatch(fetchUsers()).unwrap();
    }, []);

    const handleDelete = (id) => {
        dispatch(deleteUser(id)).unwrap().then((result) => {
            dispatch(fetchUsers()).unwrap();
        });
    };

    return <>
        <Button variant='primary' className="mb-3" onClick={() => navigate('/user/add')}>+ Tambah Pengguna</Button>
        <Card>
            <Card.Header>Daftar Pengguna</Card.Header>
            <Card.Body>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Username</th>
                            <th>Name</th>
                            <th>Role</th>
                            <th>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((el, i) => {
                                return <tr>
                                        <td>{i + 1}</td>
                                        <td>{el.username}</td>
                                        <td>{el.name}</td>
                                        <td>{el.role}</td>
                                        <td>
                                            <Button variant='info' size="sm" className="m-1" onClick={() => navigate(`/user/${el.id}/detail`)}>Detail</Button>
                                            <Button variant='success' size="sm" onClick={() => navigate(`/user/${el.id}/edit`)}>Ubah</Button>
                                            <Button variant='danger' size="sm" className="m-1" onClick={() => handleDelete(el.id)}>Hapus</Button>
                                        </td>
                                    </tr>
                                })
                        }
                    </tbody>
                </Table>
            </Card.Body>
        </Card>
    </>
}

export default User;