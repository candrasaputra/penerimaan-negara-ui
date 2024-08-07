import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";

import { Card, Form, Row, Button, Col, Alert } from 'react-bootstrap';
import { useNavigate, useParams } from "react-router-dom";

import {
    updateDeposite,
    fetchDeposite,
    getSingleDeposites
} from '../../store/reducer/depositeReducer';

import {
    fetchDistricts,
    getAllDistricts
} from '../../store/reducer/districtReducer.js';

import {
    fetchSourceofrevenues,
    getAllSourceofrevenues
} from '../../store/reducer/sourceOfRevenueReducer.js';

import { generateYears, getYear, getMonth, getLastDateOfMonth } from '../helper/date.ts';

const DepositeEdit = () => {
    const dispatch = useDispatch();
    const districts = useSelector(getAllDistricts);
    const sourceofrevenues = useSelector(getAllSourceofrevenues);
    const navigate = useNavigate();
    const { id } = useParams();

    const deposite = useSelector(getSingleDeposites);

    const [error, setError] = useState('');
    const [district, setDistrict] = useState('');
    const [sourceOfRevenue, setSourceOfRevenue] = useState('');
    const [amount, setAmount] = useState();

    const [date, setDate] = useState();
    const [month, setMonth] = useState(getMonth());
    const [year, setYear] = useState(getYear());

    useEffect(() => {
        if (deposite) {
            setDistrict(deposite?.district?.id);
            setSourceOfRevenue(deposite?.source_of_revenue?.id);
            setAmount(deposite?.amount);
            setMonth(getMonth(deposite?.date));
            setYear(getYear(deposite?.date));
        }
    }, [deposite]);

    useEffect(() => {
        dispatch(fetchDistricts()).unwrap();
        dispatch(fetchSourceofrevenues()).unwrap();
        dispatch(fetchDeposite(id)).unwrap();
    }, []);

    useEffect(() => {
        setDate(`${year}-${month}-${getLastDateOfMonth(year, month)}`);
    }, [month, year])

    const CAN_SAVE = district && sourceOfRevenue && amount && date;

    const handleSubmit = (event) => {
        event.preventDefault();

        dispatch(updateDeposite({ id, payload: {district, source_of_revenue: sourceOfRevenue, amount, date} })).unwrap()
        .then((result) => {
            navigate(`/deposite/${id}/detail`)
        })
        .catch((error) => {
            setError(error.message);
        });
    };

    return <Card>
        <Card.Header>Form Ubah Setoran</Card.Header>
        <Card.Body>
            <Form onSubmit={handleSubmit}>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2">
                        Lokasi
                    </Form.Label>
                    <Col sm="10">
                        <Form.Select aria-label="Default select" onChange={(e) => setDistrict(e.target.value)} value={district}>
                            <option>Pilih lokasi</option>
                            {
                                districts.map(el => (<option value={el.id}>{el.name}</option>))
                            }
                        </Form.Select>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2">
                        Sumber Pendapatan
                    </Form.Label>
                    <Col sm="10">
                        <Form.Select aria-label="Default select" onChange={(e) => setSourceOfRevenue(e.target.value)} value={sourceOfRevenue}>
                            <option>Pilih Sumber Pendapatan</option>
                            {
                                sourceofrevenues.map(el => (<option value={el.id}>{el.name}</option>))
                            }
                        </Form.Select>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2">
                    Nominal
                    </Form.Label>
                    <Col sm="10">
                    <Form.Control type="text" value={amount} onChange={(e) => setAmount(e.target.value)} />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2">
                        Bulan
                    </Form.Label>
                    <Col sm="10">
                        <Form.Select aria-label="Default select" value={month} defaultValue={getMonth()} onChange={(e) => setMonth(e.target.value)}>
                            <option value="1" >Januari</option>
                            <option value="2">Februari</option>
                            <option value="3">Maret</option>
                            <option value="4">April</option>
                            <option value="5">Mei</option>
                            <option value="6">Juni</option>
                            <option value="7">Juli</option>
                            <option value="8">Agustus</option>
                            <option value="9">September</option>
                            <option value="10">Oktober</option>
                            <option value="11">November</option>
                            <option value="12">Desember</option>
                        </Form.Select>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2">
                        Tahun
                    </Form.Label>
                    <Col sm="10">
                        <Form.Select aria-label="Default select" value={year} defaultValue={getYear()} onChange={(e) => setYear(e.target.value)}>
                            {
                                generateYears().map(el => <option value={el}>{el}</option>)
                            }
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

export default DepositeEdit;