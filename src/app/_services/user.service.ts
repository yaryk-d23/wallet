import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { forkJoin } from "rxjs/observable/forkJoin";
import { User } from '../_models/index';
 
@Injectable()
export class UserService {
    constructor(private http: Http) { }
    
    register(user: User) {
        return this.http.post('/api/v1/register', user, this.jwt(false)).map((response: Response) => response.json());
    }
 
    getWalletData() {
        let walletNumber = this.http.get('/api/v1/wallet', this.jwt(true))
                                .map((response: Response) => {
                                    return response.json();
                                });

        let walletOrders = this.http.get('/api/v1/wallet/transactions', this.jwt(true))
                                .map((response: Response) => {
                                    return response.json();
                                });

        return forkJoin([walletNumber, walletOrders]).map((response: any[]) => {
            return response;
        });
    }

    /*
    public getWalletNumber() {
        return this.http.get('/api/v1/wallet', this.jwt(true))
            .map((response: Response) => {
                return response.json();
            });
    }

    public getWalletOrders() {
        return this.http.get('/api/v1/transactions', this.jwt(true))
            .map((response: Response) => {
                return response.json();
            });
    }
    */
 
    // private helper methods
 
    private jwt(needAuth) {
        // create authorization header with jwt token
        let authData = JSON.parse(localStorage.getItem('currentSession'));
        if (needAuth && authData && authData.token) {
            let headers = new Headers({ 
                "content-type": "application/json;charset=UTF-8",
                'Authorization': 'Basic ' + authData.token,
                "X-Requested-With": "XMLHttpRequest"
            });
            return new RequestOptions({ headers: headers });
        }
        else {
            let headers = new Headers({ 
                "content-type": "application/json;charset=UTF-8",
                "X-Requested-With": "XMLHttpRequest"
            });
            return new RequestOptions({ headers: headers });
        }
        
    }
}