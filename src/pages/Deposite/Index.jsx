import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";

import { Card, Table, Button } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

import {
    fetchDeposites,
    deleteDeposite,
    getAllDeposites
} from '../../store/reducer/depositeReducer';

const Deposite = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const deposites = useSelector(getAllDeposites);

    useEffect(() => {
        dispatch(fetchDeposites()).unwrap();
    }, []);

    const handleDelete = (id) => {
        dispatch(deleteDeposite(id)).unwrap().then((result) => {
            dispatch(fetchDeposites()).unwrap();
        });
    };

    return <>
        <Button variant='primary' className="mb-3" onClick={() => navigate('/deposite/add')}>+ Tambah Setoran Bulanan</Button>
        <Card>
            <Card.Header>Daftar Setoran</Card.Header>
            <Card.Body>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Lokasi</th>
                            <th>Sumber Pendapatan</th>
                            <th>Nominal</th>
                            <th>Bulan</th>
                            <th>Tahun</th>
                            <th>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            deposites.map((el, i) => {
                                let objectDate = new Date(el.date);

                                return <tr>
                                        <td>{i + 1}</td>
                                        <td>{el.district.name}</td>
                                        <td>{el.source_of_revenue.name}</td>
                                        <td>{new Intl.NumberFormat('id-ID').format(el.amount)}</td>
                                        <td>{objectDate.getMonth()}</td>
                                        <td>{objectDate.getFullYear()}</td>
                                        <td>
                                            <Button variant='info' size="sm" className="m-1" onClick={() => navigate(`/deposite/${el.id}/detail`)}>Detail</Button>
                                            <Button variant='success' size="sm" onClick={() => navigate(`/deposite/${el.id}/edit`)}>Ubah</Button>
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

export default Deposite;