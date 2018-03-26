import AnnualTaxableIncome from './AnnualTaxableIncome.js';

describe('AnnualTaxableIncome', () => {
    it('Should return 0 for 0', () => {
        const a = new AnnualTaxableIncome({value: 0})
        expect(a.tax).toEqual(0)
    })
    it('Should return 6.25 for 75', () => {
        const a = new AnnualTaxableIncome({value: 75})
        expect(a.tax).toEqual(6.25)
    })
    it('Should return 170 for 750', () => {        
        const a = new AnnualTaxableIncome({value: 750})
        expect(a.tax).toEqual(170)
    })    
});