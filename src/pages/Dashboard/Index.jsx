import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Card, Form, Row, Col, Container } from 'react-bootstrap';

import DepositeMonthlyChart from '../../components/DepositeMonthlyChart';

import {
    fetchDepositeMonthly,
    getDepositesmonthly
} from '../../store/reducer/depositeReducer';
import { getYear, generateYears } from '../../helper/date.ts';

const Dashboard = () => {
    const dispatch = useDispatch();
    const depositemonthly = useSelector(getDepositesmonthly);
    const [year, setYear] = useState(getYear());
    const [chartData, setChartData] = useState();

    useEffect(() => {
        setChartData(depositemonthly);
    }, [depositemonthly]);

    useEffect(() => {
        dispatch(fetchDepositeMonthly(year)).unwrap();
    }, [year]);

    return <>
            <Card>
                <Card.Header>Dashboard</Card.Header>
                <Card.Body>
                    <DepositeMonthlyChart title="Total Setoran Perbulan" data={chartData} />
                    <Container>
                        <Row className="justify-content-md-center">
                            <Col lg="4">
                                <Form.Group as={Col} className="mb-3">
                                    <Form.Label >
                                        <strong>Tahun</strong>
                                    </Form.Label>
                                    <Col sm="10">
                                        <Form.Select aria-label="Default select" value={year} defaultValue={getYear()} onChange={(e) => setYear(e.target.value)}>
                                            {
                                                generateYears().map(el => <option value={el}>{el}</option>)
                                            }
                                        </Form.Select>
                                    </Col>
                                </Form.Group>
                            </Col>
                        </Row>
                    </Container>
                </Card.Body>

            </Card>
        </>
}

export default Dashboard;