import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'amountTranform',
    pure: false
})

export class AmountTranformPipe  implements PipeTransform {
    private newAmount: any = '';
    constructor() { }
    transform(amount: any, exp: number, currency: string): string {
        if(amount !== undefined ){
            let isPositive =  amount[0] !== '-';
            this.newAmount = isPositive ? (amount / Math.pow(10, exp)).toFixed(12) : '-' + ((-amount / Math.pow(10, exp)).toFixed(12));
        }
        currency ? this.newAmount += ' ' + currency : null;
        return this.newAmount;
    }

}