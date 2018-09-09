import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/catch';
import { forkJoin } from "rxjs/observable/forkJoin";
import { User, Wallet, SendRequest, NewPassword, Gift } from '../_models/index';
import { Router } from '@angular/router';
import { error } from 'util';
import {Observable} from 'rxjs';

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
        })
    }

    getCurrentUser(){
        return this.http.get('/api/v1/user/current', this.jwt(true))
            .map((response: Response) => {
                // this.logoutAfterError(response.status);        
                return response.json();
            }).catch((response: Response) => {
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

    createGift(data: Gift){
        return this.http.post('/api/v1/gift/create', data, this.jwt(true))
            .map((response: Response) => {
                // this.logoutAfterError(response.status);                    
                console.log(response);
                return response.json();
            }).catch((response: Response) => {
                console.log(response);
                this.logoutAfterError(response); 
                return response.json();
            });
    };

    confirmGift(token: string){
        return this.http.get('/api/v1/gift/confirm?token=' + token, this.jwt(true))
            .map((response: Response) => {
                // this.logoutAfterError(response.status);                    
                return response.json();
            }).catch((response: Response) => {
                this.logoutAfterError(response); 
                return response.json();
            });
    };

    getGift(token: string, address?: string){
        let reuestUrl = '/api/v1/gift?token=' + token;
        if(address) 
            reuestUrl += '&address=' + address;
        return this.http.get(reuestUrl, this.jwt(true))
            .map((response: Response) => {
                // this.logoutAfterError(response.status);                    
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

    getAddressByUserName(userName: string):Observable<any>{
        return this.http.get('/api/v1/wallet/address?txt='+userName+'.karbo.me')
            .map((response: Response) => {
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
                'x-auth-session': authData.token,
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