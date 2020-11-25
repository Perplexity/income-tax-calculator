import React from 'react';
import { Col, Form, InputGroup, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { taxBands } from '../../types/TaxBand';
import { getTaxBand, setIncome } from './calculatorSlice';
import styles from './Calculator.module.css'; //Component styling
import NumberFormat from 'react-number-format';

export default () => {
    const dispatch = useDispatch();
    const state = useSelector((state: RootState) => state.calculator); //Selects the root state from the store and returns the calculator state.
    return (
        <Form>
            <Form.Group as={Col}>
                <Form.Label>Enter your current yearly income</Form.Label>
                <InputGroup>
                    <InputGroup.Prepend>
                        <InputGroup.Text>£</InputGroup.Text>
                    </InputGroup.Prepend>
                    <NumberFormat value={state.income} displayType="input" thousandSeparator={true} onValueChange={(values) => {
                        dispatch(setIncome(values.floatValue)); //Set income to entered value.
                        dispatch(getTaxBand()) //And then get our appropriate tax band.
                    }} />
                </InputGroup>
            </Form.Group>
            {state.taxBand &&
                <Form.Group as={Col}>
                    <Form.Label>Your calculated income tax</Form.Label>
                    <Table>
                        <thead>
                            <tr>
                                <th>Band</th>
                                <th>Tax rate</th>
                                <th>Income lost</th>
                                <th>Net salary</th>
                            </tr>
                        </thead>
                        <tbody>
                            {taxBands.map(band => {
                                if (state.income) {
                                    const incomeLost = state.income * band.taxRate;
                                    const rowClass = band.id == state.taxBand?.id ? styles.selectedBand : ""; //Will highlight the tax band we fall into.
                                    return (
                                        <tr key={band.id} className={rowClass}>
                                            <td>{band.name}</td>
                                            <td>{band.taxRate * 100}%</td>
                                            <td style={{ color: "red" }}>-<NumberFormat value={incomeLost} displayType="text" thousandSeparator={true} prefix="£" /></td>
                                            <td style={{ color: "green" }}><NumberFormat value={state.income - incomeLost} displayType="text" thousandSeparator={true} prefix="£" /></td>
                                        </tr>
                                    )
                                }
                            }
                            )}
                        </tbody>
                    </Table>
                </Form.Group>
            }
        </Form>
    )
}