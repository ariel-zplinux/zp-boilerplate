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
