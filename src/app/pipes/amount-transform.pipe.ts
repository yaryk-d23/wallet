import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'amountTranform',
    pure: false
})

export class AmountTranformPipe  implements PipeTransform {
    private newAmount: string = '';
    constructor() { }
    transform(amount: any, exp: number, currency: string): string {
        if(amount !== undefined ){
            let isPositive =  amount[0] !== '-';
            this.newAmount = isPositive ? (amount / Math.pow(10, exp)).toString() : '-' + (parseInt(amount, 10) / Math.pow(10, exp)).toString();
        }
        currency ? this.newAmount += ' ' + currency : null;
        return this.newAmount;
    }

}