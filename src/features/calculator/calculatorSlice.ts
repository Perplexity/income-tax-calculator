
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TaxBand, taxBands } from '../../types/TaxBand';

//The interface for our state object.
interface CalculatorState {
    income: number
    taxBand: TaxBand | null | undefined //Value can also be null or undefined, as default value is null, and our 'getTaxBand' function can return 'undefined'
}
//Our initial state object
const initialState: CalculatorState = {
    income: 0,
    taxBand: null
};
//Our 'slice' is what provides our reducers and sets the initial state.
export const calculatorSlice = createSlice({
    name: 'calculator',
    initialState,
    reducers: {
        setIncome: (state, action: PayloadAction<number>) => {
            state.income = action.payload;
        },
        getTaxBand: state => {
            const { income } = state;
            const taxBand = taxBands.find(band => income >= band.minThreshold && income <= band.maxThreshold); //Find a tax band by checking if our income fits between the min and max threshold.
            state.taxBand = taxBand;
        }
    },
});

export const { setIncome, getTaxBand } = calculatorSlice.actions; //Export actions to be used for dispatching.

export default calculatorSlice.reducer; //Export the reducer to be used in our store.