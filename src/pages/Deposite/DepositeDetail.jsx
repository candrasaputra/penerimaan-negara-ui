import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";

import { Card, Table, Row, Col } from 'react-bootstrap';
import { useParams } from "react-router-dom";

import {
    fetchDeposite,
    getSingleDeposites
} from '../../store/reducer/depositeReducer';

const Deposite = () => {
    const dispatch = useDispatch();
    const deposite = useSelector(getSingleDeposites);
    const { id } = useParams();

    useEffect(() => {
        dispatch(fetchDeposite(id)).unwrap();
    }, []);

    let objectDate = new Date(deposite.date);

    return deposite ? <>
                <Card>
                    <Card.Header>Detail Setoran</Card.Header>
                    <Card.Body>
                        <h4>Setoran</h4>
                        <Row>
                            <Col md="7">
                                <Table bordered hover>
                                    <tbody>
                                        <tr>
                                            <td>Lokasi</td>
                                            <td>{deposite?.district?.name}</td>
                                        </tr>
                                        <tr>
                                            <td>Sumber Pendapatan</td>
                                            <td>{deposite?.source_of_revenue?.name}</td>
                                        </tr>
                                        <tr>
                                            <td>Nominal</td>
                                            <td>{new Intl.NumberFormat('id-ID').format(deposite.amount)}</td>
                                        </tr>
                                        <tr>
                                            <td>Bulan</td>
                                            <td>{objectDate.getMonth()}</td>
                                        </tr>
                                        <tr>
                                            <td>Tahun</td>
                                            <td>{objectDate.getFullYear()}</td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </Col>
                        </Row>
                        <h4>Alokasi</h4>

                        <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Wilayah</th>
                                        <th>Nominal</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        deposite.breakdown ? deposite.breakdown.map(el => {
                                            return <tr>
                                                    <td>1</td>
                                                    <td>{el.deposite_area.name}</td>
                                                    <td>{new Intl.NumberFormat('id-ID').format(el.amount)}</td>
                                                </tr>
                                            }) : ''
                                    }
                                </tbody>
                            </Table>
                    </Card.Body>
                </Card>
    </> : <></>
}

export default Deposite;