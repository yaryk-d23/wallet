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
        let headers = new Headers({ 'Authorization': 'Basic dXNlckBnbWFpbC5jb206cGFzc3dvcmQ=' });
        let option = new RequestOptions({ headers: headers });
        
        return this.http.get('/api/wallet', option)
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let user = response.json();
                /*if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentSesion', JSON.stringify(user));
                }
 
                return user;*/
                console.log(user);
            });
    }
 
    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }

    
}