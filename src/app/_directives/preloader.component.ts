import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { PreloaderService } from '../_services/index';

@Component({
   moduleId: module.id,
   selector: 'preloader',
   templateUrl: 'preloader.component.html'
})

export class PreloaderComponent {
   loading = {type: 'hide', show: false};

   constructor(private preloaderService: PreloaderService) { }

   ngOnInit() {
       this.preloaderService.getPreloader().subscribe(loading => { this.loading = loading;});
   }
}