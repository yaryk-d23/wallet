import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import { 
        trigger, style, transition,
        animate, keyframes,query,
        stagger,group, state, animateChild 
    } from '@angular/animations';
import { AlertService } from '../_services/index';

@Component({
   moduleId: module.id,
   selector: 'alert',
   templateUrl: 'alert.component.html',
   animations: [
    trigger('ngIfAnimation', [
        transition('void => *', [
            query('*', stagger('300ms', [
                animate('1s ease-in', keyframes([
                    style({opacity: 0, transform: 'translateY(-100%)', offset: 0}),
                    style({opacity: .5, transform: 'translateY(-50)', offset: 0.5}),
                    style({opacity: 1, transform: 'translateY(0)', offset: 1.0}),
                    ]))]), {optional: true}),
            ]),
        transition('* => void', [
            query('*', stagger('300ms', [
                animate('1s ease-in', keyframes([
                    style({opacity: 1, transform: 'translateY(0)', offset: 0}),
                    style({opacity: .5, transform: 'translateY(-50%)', offset: 0.5}),
                    style({opacity: 0, transform: 'translateY(-100%)', offset: 1.0}),
                    ]))]), {optional: true}),
            ])
        ])
    ]
})

export class AlertComponent {
    message: any;

    constructor(private alertService: AlertService) { }

    ngOnInit() {
        this.alertService.getMessage().subscribe(message => { 
            if(message){
                this.message = message.text; 
                setTimeout(() => {
                    this.message = undefined;
                },5000);
            }
        });
    }
}