import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Card, Form, Row, Col, Container, Table } from 'react-bootstrap';

import {
    fetchSummaryBreakdown,
    getReportSummarybreakdowns
} from '../../store/reducer/reportReducer.js';

import {
    fetchDepositeAreas,
    getAllDepositeAreas
} from '../../store/reducer/depositeAreaReducer.js';

import { getYear, generateYears, numberToMonth } from '../../helper/date.ts';

const Dashboard = () => {
    const dispatch = useDispatch();
    const summarybreakdown = useSelector(getReportSummarybreakdowns);
    const depositeareas = useSelector(getAllDepositeAreas);
    const [year, setYear] = useState(getYear());
    const [depositeArea, setDepositeArea] = useState('1D62FDAA-3B92-4887-9B13-1708A8249322');

    useEffect(() => {
        dispatch(
            fetchSummaryBreakdown({year, depositeArea})
        ).unwrap();
    }, [year, depositeArea]);

    useEffect(() => {
        dispatch(fetchDepositeAreas()).unwrap();
    }, []);

    const months = Array.from(new Set(summarybreakdown.flatMap(d =>
        d.source_of_revenue.flatMap(sr =>
            sr.revenue.map(r => r.month)
        )
    ))).sort((a, b) => a - b);

    return <>
                <Card>
                    <Card.Header>Laporan Rekapitulasi Penerimaan Negara</Card.Header>
                    <Card.Body>
                        <Table bordered>
                            <thead>
                                <tr>
                                    <th><strong>Uraian</strong></th>
                                    {months.map(month => (
                                        <th key={month}>{numberToMonth(month)}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {summarybreakdown.map(item => (
                                    <React.Fragment key={item.id}>
                                        <tr>
                                            <td colSpan={months.length + 1} className="table-primary"><strong>{item.name}</strong></td>
                                        </tr>
                                        {item.source_of_revenue.map(source => (
                                            <React.Fragment key={source.id}>
                                                <tr>
                                                    <td>{source.name}</td>
                                                    {months.map(month => {
                                                        const revenue = source.revenue.find(r => r.month === month);
                                                        return (
                                                            <td key={month}>{revenue ? new Intl.NumberFormat('id-ID').format(revenue.total) : ''}</td>
                                                        );
                                                    })}
                                                </tr>
                                            </React.Fragment>
                                        ))}
                                    </React.Fragment>
                                ))}
                            </tbody>
                        </Table>

                        
                        <Container>
                            <Row className="justify-content-md-center">
                                <Col lg="4">
                                    <Form.Group as={Col} className="mb-3">
                                        <Form.Label >
                                            <strong>Wilayah Setor</strong>
                                        </Form.Label>
                                        <Col sm="10">
                                            <Form.Select aria-label="Default select" value={depositeArea} onChange={(e) => setDepositeArea(e.target.value)}>
                                                {
                                                    depositeareas.map(el => <option value={el.id}>{el.name}</option>)
                                                }
                                            </Form.Select>
                                        </Col>
                                    </Form.Group>
                                </Col>

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