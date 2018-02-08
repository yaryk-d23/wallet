import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/catch';
import { forkJoin } from "rxjs/observable/forkJoin";
import { User, Wallet, SendRequest, NewPassword } from '../_models/index';
import { Router } from '@angular/router';
import { error } from 'util';

@Injectable()
export class UserService {
    constructor(
        private http: Http,
        private router: Router
    ) { }
    
    register(user: User) {
        return this.http.post('/api/v1/user/register', user, this.jwt(false))
        .map((response: Response) => {
            // this.logoutAfterError(response.status);        
            return response.json();
        }).catch((response: Response) => {
            console.log(response.json());
            this.logoutAfterError(response); 
            return response.json();
        });
    }

    getWallet() {
        return this.http.get('/api/v1/wallet', this.jwt(true))
                .map((response: Response) => {
                    // this.logoutAfterError(response.status);        
                    return response.json();
                }).catch((response: Response) => {
                    this.logoutAfterError(response); 
                    return response.json();
                });
    };
 
    getWalletData() {
        let walletNumber = this.getWallet();

        let walletOrders = this.http.get('/api/v1/wallet/transactions', this.jwt(true))
                                .map((response: Response) => {
                                    // this.logoutAfterError(response.status);                                            
                                    return response.json();
                                }).catch((response: Response) => {
                                    this.logoutAfterError(response); 
                                    return response.json();
                                });

        let walletBalance = this.getBalance();

        return forkJoin([walletNumber, walletOrders, walletBalance]).map((response: any[]) => {
            return response;
        });
    }

    getBalance() { 
        return this.http.get('/api/v1/wallet/balance', this.jwt(true))
                .map((response: Response) => {
                    // this.logoutAfterError(response.status);                            
                    return response.json();
                }).catch((response: Response) => {
                    this.logoutAfterError(response); 
                    return response.json();
                });
    }

    getPaymentId() {
        console.log("p-id");
        return this.http.get('/api/v1/wallet/paymentId', this.jwt(true))
            .map((response: Response) => {
                return response.json();
            })
            .catch((response: Response) => {
                this.logoutAfterError(response); 
                return response.json();
            });
    };

    sendData(data: SendRequest) {
        return this.http.post('/api/v1/wallet/send', data, this.jwt(true))
            .map((response: Response) => {
                // this.logoutAfterError(response.status);                    
                return response.json();
            }).catch((response: Response) => {
                this.logoutAfterError(response); 
                return response.json();
            });
    };

    getFee() {
        return this.http.get('/api/v1/wallet/send/fee', this.jwt(true))
            .map((response: Response) => {
                // this.logoutAfterError(response.status);                        
                return response.json();
            }).catch((response: Response) => {
                this.logoutAfterError(response); 
                return response.json();
            });
    };

    confirmRegistration(token: string) {
        return this.http.get('/api/v1/user/confirm?token=' + token, this.jwt(false))
            .map((response: Response) => {
                // this.logoutAfterError(response.status);                        
                return response.json();
            }).catch((response: Response) => {
                this.logoutAfterError(response); 
                return response.json();
            });
    };

    confirmSend(token: string) {
        return this.http.get('/api/v1/wallet/send/confirm?token=' + token, this.jwt(false))
            .map((response: Response) => {
                // this.logoutAfterError(response);                        
                return response.json();
            }).catch((response: Response) => {
                this.logoutAfterError(response); 
                return response.json();
            });
    };

    changePassword(data: NewPassword){
        return this.http.put('/api/v1/user/password', data, this.jwt(true))
            .map((response: Response) => {
                // this.logoutAfterError(response.status);                    
                return response.json();
            }).catch((response: Response) => {
                this.logoutAfterError(response); 
                return response.json();
            });
    }
 
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

    public logoutAfterError(res: Response): any{
        if(res.status === 401){
            setTimeout(() => {
                this.router.navigateByUrl('/login');
            },3000);}
        return res;
    }
}