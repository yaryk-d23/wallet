import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
 
@Injectable()
export class AuthenticationService {
    constructor(
        private http: Http
    ) {}
 
    login(model: any) {
        let headers = new Headers({ 
            "X-Requested-With": "XMLHttpRequest"
        });
        let option = new RequestOptions({ headers: headers });
        let stringQuery = "?login=" + model.login + "&password=" + model.password;
        return this.http.get('/api/v1/user/login' + stringQuery, option)
            .map((response: any) => {
                let newToken = JSON.parse(response._body);
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentSession', JSON.stringify({token: newToken.token}));
                return true;
            });
    }
 
    logout() {
        let authData = JSON.parse(localStorage.getItem('currentSession'));
        if(authData) {
            let headers = new Headers({ 
                "X-Requested-With": "XMLHttpRequest",
                'x-auth-session': authData.token
            });
            let option = new RequestOptions({ headers: headers });
            this.http.get('/api/v1/user/logout', option).subscribe(success => {
                // remove user from local storage to log user out
                localStorage.removeItem('currentSession');     
            },error=>{
                // remove user from local storage to log user out
                localStorage.removeItem('currentSession');
            });
                
        }
    }

    
}