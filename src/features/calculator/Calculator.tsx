import React from 'react';
import { Col, Form, InputGroup, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { getTaxBand, setIncome } from './calculatorSlice';

export default () => {
    const dispatch = useDispatch();
    const state = useSelector((state: RootState) => state.calculator);
    return (
        <Form>
            <Form.Group as={Col}>
                <Form.Label>Enter your current yearly income</Form.Label>
                <InputGroup>
                    <InputGroup.Prepend>
                        <InputGroup.Text>£</InputGroup.Text>
                    </InputGroup.Prepend>
                    <Form.Control type="number" min={0} max={1000000000000} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        dispatch(setIncome(parseInt(e.currentTarget.value)));
                        dispatch(getTaxBand())
                    }}></Form.Control>
                </InputGroup>
            </Form.Group>
            {state.taxBand &&
                <Form.Group as={Col}>
                    <Form.Label>Your calculated income tax</Form.Label>
                    <Table>
                        <thead>
                            <th>Band</th>
                            <th>Tax rate</th>
                            <th>Net salary</th>
                        </thead>
                        <tbody>
                            <td>{state.taxBand.name}</td>
                            <td>{state.taxBand.taxRate * 100}%</td>
                            <td>{state.income - (state.income * state.taxBand.taxRate)}</td>
                        </tbody>
                    </Table>
                </Form.Group>
            }
        </Form>
    )
}