export interface TaxBand {
    name: string
    minThreshold: number
    maxThreshold: number
    taxRate: number
}

export const taxBands: Array<TaxBand> = [
    {
        name: "Personal Allowance",
        minThreshold: 0,
        maxThreshold: 12500,
        taxRate: 0
    },
    {
        name: "Basic rate",
        minThreshold: 12501,
        maxThreshold: 50000,
        taxRate: 0.2
    },
    {
        name: "Higher rate",
        minThreshold: 50001,
        maxThreshold: 150000,
        taxRate: 0.4
    },
    {
        name: "Additional rate",
        minThreshold: 150001,
        maxThreshold: 1000000000000,
        taxRate: 0.45
    }
]