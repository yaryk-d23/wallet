import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
 
@Injectable()
export class AuthenticationService {
    constructor(
        private http: Http
    ) {}
 
    login(authToken: string) {
        let headers = new Headers({ 
            'Authorization': 'Basic ' + authToken,
            "X-Requested-With": "XMLHttpRequest"
        });
        let option = new RequestOptions({ headers: headers });
        
        return this.http.get('/karbonator/api/v1/wallet', option)
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let wallet = response.json();
                if (wallet.length && wallet[0].address) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentSession', JSON.stringify({token: authToken}));
                }
 
                return wallet;
            });
    }
 
    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentSession');
    }

    
}