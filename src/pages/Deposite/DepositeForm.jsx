import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";

import { Card, Form, Row, Button, Col } from 'react-bootstrap';
import { useParams } from "react-router-dom";

import {
    fetchDeposite,
    getSingleDeposites
} from '../../store/reducer/depositeReducer';

import {
    fetchUserdistricts,
    getAlluserdistricts
} from '../../store/reducer/userDistrictReducer';

import { generateYears, getYear, getMonth, getLastDateOfMonth } from './../helper/date.ts';

const Deposite = () => {
    const dispatch = useDispatch();
    const userdistricts = useSelector(getAlluserdistricts);

    const [district, setDistrict] = useState();
    const [sourceOfRevenue, setSourceOfRevenue] = useState();
    const [amount, setAmount] = useState();

    const [date, setDate] = useState();
    const [month, setMonth] = useState(getMonth());
    const [year, setYear] = useState(getYear());

    useEffect(() => {
        dispatch(fetchUserdistricts()).unwrap();
    }, []);

    useEffect(() => {
        setDate(`${year}-${month}-${getLastDateOfMonth(year, month)}`);
    }, [month, year])

    return <Card>
        <Card.Header>Setoran</Card.Header>
        <Card.Body>
            <Form>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2">
                        Lokasi
                    </Form.Label>
                    <Col sm="10">
                        <Form.Select aria-label="Default select" onChange={(e) => setDistrict(e.target.value)}>
                            <option>Pilih lokasi</option>
                            {
                                userdistricts.map(el => (<option value={el.district.id}>{el.district.name}</option>))
                            }
                        </Form.Select>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2">
                        Sumber Pendapatan
                    </Form.Label>
                    <Col sm="10">
                        <Form.Select aria-label="Default select" onChange={(e) => setSourceOfRevenue(e.target.value)}>
                            <option>Pilih Sumber Pendapatan</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </Form.Select>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2">
                    Nominal
                    </Form.Label>
                    <Col sm="10">
                    <Form.Control type="text" onChange={(e) => setAmount(e.target.value)} />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2">
                        Sumber Pendapatan
                    </Form.Label>
                    <Col sm="10">
                        <Form.Select aria-label="Default select" defaultValue={getMonth()} onChange={(e) => setMonth(e.target.value)}>
                            <option>Pilih Bulan</option>
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
                        Sumber Pendapatan
                    </Form.Label>
                    <Col sm="10">
                        <Form.Select aria-label="Default select" defaultValue={getYear()} onChange={(e) => setYear(e.target.value)}>
                            <option>Pilih Tahun</option>
                            {
                                generateYears().map(el => <option value={el}>{el}</option>)
                            }
                        </Form.Select>
                    </Col>
                </Form.Group>

                <Button>Simpan</Button>
            </Form>
        </Card.Body>
    </Card>
}

export default Deposite;