import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { forkJoin } from "rxjs/observable/forkJoin";
import { User, Wallet, SendRequest } from '../_models/index';
 
@Injectable()
export class UserService {
    constructor(private http: Http) { }
    
    register(user: User) {
        return this.http.post('/karbonator/api/v1/user/register', user, this.jwt(false))
        .map((response: Response) => {
            return response.json()
        });
    }

    getBalance() {
        return this.http.get('/karbonator/api/v1/wallet', this.jwt(true))
                .map((response: Response) => {
                    return response.json();
                });
    };
 
    getWalletData() {
        let walletNumber = this.getBalance();

        let walletOrders = this.http.get('/karbonator/api/v1/wallet/transactions', this.jwt(true))
                                .map((response: Response) => {
                                    return response.json();
                                });

        let walletBalance = this.http.get('/karbonator/api/v1/wallet/balance', this.jwt(true))
                                .map((response: Response) => {
                                    return response.json();
                                });

        return forkJoin([walletNumber, walletOrders, walletBalance]).map((response: any[]) => {
            return response;
        });
    }

    getWalletNumber() { 
        return this.http.get('/karbonator/api/v1/wallet/balance', this.jwt(true))
                .map((response: Response) => {
                    return response.json();
                });
    }

    getPaymentId() {
        return this.http.get('/karbonator/api/v1/wallet/paymentId', this.jwt(true))
            .map((response: Response) => response.json());
    };

    sendData(data: SendRequest) {
        return this.http.post('/karbonator/api/v1/wallet/send', data, this.jwt(true)).map((response: Response) => {return response.json();});
    };

    getFee() {
        return this.http.get('/karbonator/api/v1/wallet/send/fee', this.jwt(true))
            .map((response: Response) => response.json());
    };

    confirmRegistration(token: string) {
        return this.http.get('/karbonator/api/v1/user/confirm?token=' + token, this.jwt(false))
            .map((response: Response) => {return response.json();});
    };

    confirmSend(token: string) {
        return this.http.get('/karbonator/api/v1/wallet/send/confirm?token=' + token, this.jwt(false))
            .map((response: Response) => {return response.json();});
    };
 
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