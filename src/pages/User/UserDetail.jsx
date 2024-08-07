import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";

import { Card, Table, Row, Col } from 'react-bootstrap';
import { useParams } from "react-router-dom";

import {
    fetchUser,
    getSingleUsers
} from '../../store/reducer/userReducer';

const UserDetail = () => {
    const dispatch = useDispatch();
    const user = useSelector(getSingleUsers);
    const { id } = useParams();

    useEffect(() => {
        dispatch(fetchUser(id)).unwrap();
    }, []);

    return user ? <>
                <Card>
                    <Card.Header>Detail Pengguna</Card.Header>
                    <Card.Body>
                        <h4>Pengguna</h4>
                        <Row>
                            <Col md="7">
                                <Table bordered hover>
                                    <tbody>
                                        <tr>
                                            <td>Nama</td>
                                            <td>{user?.name}</td>
                                        </tr>
                                        <tr>
                                            <td>Username</td>
                                            <td>{user?.username}</td>
                                        </tr>
                                        <tr>
                                            <td>Hak Akses</td>
                                            <td>{user?.role}</td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </Col>
                        </Row>

                        <h4>Akses Lokasi</h4>
                        <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Lokasi</th>
                                        <th>Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        (user?.role === 'AM_PPN') ? <tr>
                                            <td colSpan={3}>Semua District</td>
                                        </tr> :
                                        user?.districts ? user?.districts.map((el, i) => {
                                            return <tr>
                                                    <td>{i + 1}</td>
                                                    <td>{el.district.name}</td>
                                                    <td></td>
                                                </tr>
                                            }) : ''
                                    }
                                </tbody>
                            </Table>
                    </Card.Body>
                </Card>
    </> : <></>
}

export default UserDetail;