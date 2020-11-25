
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../../app/store';
import { TaxBand, taxBands } from '../../types/TaxBand';

interface CalculatorState {
    income: number
    taxBand: TaxBand | null | undefined
}

const initialState: CalculatorState = {
    income: 0,
    taxBand: null
};

export const calculatorSlice = createSlice({
    name: 'calculator',
    initialState,
    reducers: {
        setIncome: (state, action: PayloadAction<number>) => {
            state.income = action.payload;
        },
        getTaxBand: state => {
            const { income } = state;
            const taxBand = taxBands.find(band => income >= band.minThreshold && income <= band.maxThreshold);
            state.taxBand = taxBand;
        }
    },
});

export const { setIncome, getTaxBand } = calculatorSlice.actions;

export default calculatorSlice.reducer;