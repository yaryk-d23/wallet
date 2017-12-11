import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
 
@Injectable()
export class PreloaderService {
    private subject = new Subject<any>();

 
    constructor() {
        // clear alert message on route change
        
    }
 
    show(show = true) {
        this.subject.next({ type: 'show', show: show });
    }
 
    hide(show = false) {
        this.subject.next({ type: 'hide', show: show });
    }
 
    getPreloader(): Observable<any> {
        return this.subject.asObservable();
    }
    
}