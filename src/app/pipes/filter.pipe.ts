import { Pipe, PipeTransform, Injectable } from '@angular/core';

@Pipe({
    name: 'filter'
})

@Injectable()
export class FilterPipe implements PipeTransform {
    transform(items: any[], field: string, value: string): any[] {
        if (!items) {
            return [];
        }
        if (!field || !value) {
            return items;
        }

        return items.filter(singleItem => singleItem["address"].toString().toLowerCase().includes(value.toLowerCase()) || 
                singleItem["transactionHash"].toString().toLowerCase().includes(value.toLowerCase()) ||
                singleItem["paymentId"].toString().toLowerCase().includes(value.toLowerCase()));
    }
}