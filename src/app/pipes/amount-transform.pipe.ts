import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'amountTranform',
    pure: false
})

export class AmountTranformPipe  implements PipeTransform {
    constructor() { }
    transform(amount: any, exp: number, currency: string): string {
        let newAmount: any = '0';
        if(amount != undefined && amount != null) {
            newAmount = amount;
            let isPositive =  newAmount [0] !== '-';
            newAmount = isPositive ? (newAmount / Math.pow(10, exp)).toFixed(12) : 
                        '-' + ((-newAmount / Math.pow(10, exp)).toFixed(12));
        }
        newAmount = this.clear(newAmount);
        currency ? newAmount += ' ' + currency : null;
        return newAmount;
    }
    clear(amount: string): string {
        let input = amount;
        for(let i=input.length-1;i>0;i--)
        {
            if(input[i-3] == '.')
              break;
          else if(input[i] == '0')
            input = input.slice(0, -1)
          else break;
        }
        return input;
    }

}