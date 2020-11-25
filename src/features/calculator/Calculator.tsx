import React from 'react';
import { Col, Form, InputGroup, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { taxBands } from '../../types/TaxBand';
import { getTaxBand, setIncome } from './calculatorSlice';
import styles from './Calculator.module.css'; //Component styling

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
                    <Form.Control type="number" min={0} max={1000000000000} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        dispatch(setIncome(parseInt(e.currentTarget.value))); //Set income to entered value.
                        dispatch(getTaxBand()) //And then get our appropriate tax band.
                    }}></Form.Control>
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
                                const incomeLost = state.income * band.taxRate;
                                const rowClass = band.id == state.taxBand?.id ? styles.selectedBand : ""; //Will highlight the tax band we fall into.
                                return (
                                    <tr className={rowClass}>
                                        <td>{band.name}</td>
                                        <td>{band.taxRate * 100}%</td>
                                        <td style={{ color: "red" }}>-£{incomeLost}</td>
                                        <td>£{state.income - incomeLost}</td>
                                    </tr>
                                )
                            }
                            )}
                        </tbody>
                    </Table>
                </Form.Group>
            }
        </Form>
    )
}