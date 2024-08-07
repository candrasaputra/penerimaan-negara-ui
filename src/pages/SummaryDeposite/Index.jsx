import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Card, Form, Row, Col, Container, Table } from 'react-bootstrap';

import {
    fetchSummaryDeposite,
    getReportSummarydeposites
} from '../../store/reducer/reportReducer.js';
import { getYear, generateYears, numberToMonth } from '../../helper/date.ts';

const Dashboard = () => {
    const dispatch = useDispatch();
    const summarydeposite = useSelector(getReportSummarydeposites);
    const [year, setYear] = useState(getYear());

    useEffect(() => {
        dispatch(
            fetchSummaryDeposite(year)
        ).unwrap();
    }, [year]);

    const months = Array.from(new Set(summarydeposite.flatMap(d =>
        d.source_of_revenue.flatMap(sr =>
            sr.revenue.map(r => r.month)
        )
    ))).sort((a, b) => a - b);

    return <>
                <Card>
                    <Card.Header>Summary Storan Bulanan</Card.Header>
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
                                {summarydeposite.map(item => (
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