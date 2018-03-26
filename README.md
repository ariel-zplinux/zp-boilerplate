Please find here my solution to your test task.

## STACK

- Node
- Jest
- Enzyme

## INSTRUCTION
```shell
git clone https://github.com/ariel-zplinux/zp-boilerplate.git
cd zp-boilerplate
git checkout MOBILITY-WORK
npm install
npm test
```
## CODE

### CLASS
```javascript
class AnnualTaxableIncome {
    constructor(props) {
        this.value = props.value;
        this.currency = props.currency || 'Rp';
        this.tax = this.calculateTax(props.value);
    }

    calculateTax(value) {
        let remaining = 0;

        if (value >= 0) {
            remaining = value;
            const total = AnnualTaxableIncome.edges.reduce((sum, current) => {
                // no min => 1st edge
                if (!current.min && current.max) {                    
                    if (value <= current.max)
                        return sum + (current.tax/100 * value);
                    else {
                        remaining -= current.max;
                        return sum + (current.tax/100 * current.max);
                    }
                }
                // between
                else if (current.min && current.max) {
                    if (value <= current.min) {
                        return sum;
                    }
                    if (value <= current.max) {
                        return sum + (current.tax/100 * (value - current.min));
                    }
                    else {
                        remaining -= (current.max - current.min);
                        return sum + (current.tax/100 * (current.max - current.min));
                    }
                }
                // no max => last edge
                else if (current.min && !current.max && (value >= current.min)) {
                    return sum + (current.tax/100 * remaining);
                }
                // default - to catch other cases
                else 
                    return sum;            
            }, 0);
            return total;
        }
    }
}

AnnualTaxableIncome.edges = [
    {max: 50, tax: 5},
    {min: 50, max: 250, tax: 15},
    {min: 250, max: 500, tax: 25},
    {min: 500, tax: 30}
];

export default AnnualTaxableIncome;
```

### TEST
```javascript
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
```
## REM

- For simplicity, I've divided your income numbers by 1000000.

- It's a first working version, I would write a cleaner and more comprehensive reduce function for a final product

- And I could present the data in a nicer way, using my boilerplate, but it's out of scope here

- Thanks for this test it gave me the opportunity to add testing tools to my boilerplate :)