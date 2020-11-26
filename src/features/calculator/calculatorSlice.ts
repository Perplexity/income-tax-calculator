
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import NIContributions from '../../types/NIContributions';
import { TaxBand, taxBands } from '../../types/TaxBand';

//The interface for our state object.
interface CalculatorState {
    income: number | undefined
    taxBand: TaxBand | null | undefined //Value can also be null or undefined, as default value is null, and our 'getTaxBand' function can return 'undefined'
    niContributions: NIContributions | null
}
//Our initial state object
const initialState: CalculatorState = {
    income: 0,
    taxBand: null,
    niContributions: null
};
//Our 'slice' is what provides our reducers and sets the initial state.
export const calculatorSlice = createSlice({
    name: 'calculator',
    initialState,
    reducers: {
        setIncome: (state, action: PayloadAction<number | undefined>) => {
            state.income = action.payload;
        },
        getTaxBand: state => {
            const { income } = state;
            if (income) {
                const taxBand = taxBands.find(band => income >= band.minThreshold && income <= band.maxThreshold); //Find a tax band by checking if our income fits between the min and max threshold.
                state.taxBand = taxBand;
            } else {
                state.taxBand = null;
            }
        },
        getNIContributions: state => {
            let niContributions = null;
            if (state.income) {
                const weeklyIncome = state.income / 52;
                if (weeklyIncome > 183) {
                    let twelvePercent = weeklyIncome - 183;
                    let twoPercent = 0;
                    if (weeklyIncome > 962) {
                        twoPercent = weeklyIncome - 962;
                        twelvePercent -= twoPercent;
                    }
                    const twelve = twelvePercent * 0.12;
                    const two = twoPercent * 0.02;
                    const weeklyNI = twelve + two;
                    const yearlyNI = weeklyNI * 52;
                    niContributions = {
                        weekly: weeklyNI,
                        yearly: yearlyNI
                    }
                } else {
                    niContributions = {
                        weekly: 0,
                        yearly: 0
                    }
                }
            }
            state.niContributions = niContributions;
        }
    },
});

export const { setIncome, getTaxBand, getNIContributions } = calculatorSlice.actions; //Export actions to be used for dispatching.

export default calculatorSlice.reducer; //Export the reducer to be used in our store.