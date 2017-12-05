import { Component, OnInit } from '@angular/core';

import { User, Wallet, SendRequest } from '../_models/index';
import { AlertService, UserService } from '../_services/index';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})
export class WalletComponent implements OnInit {

  currentUser: User;
  model: SendRequest = new SendRequest();
  data: Wallet = new Wallet();
  loading: boolean = true;
  sendLoading: boolean = false;
  sendForm: any;
    
  constructor(
    private userService: UserService,
    private alertService: AlertService) {
      this.currentUser = JSON.parse(localStorage.getItem('currentSession'));
  }

  ngOnInit() {
    console.log(this.data);
      this.loadWalletData();
  }


  private loadWalletData() {
    this.userService.getWalletData().subscribe(data => { 
        this.data =  {
            wallets: data[0], 
            transactions: data[1],
            balance: data[2]
        }; 
        console.log(this.data);
        this.loading = false;
    },
    error => {
        this.alertService.error(error);
        this.loading = false;
    });
  }

  public sendData(): void {
      this.sendLoading = true;
      this.userService.sendData(this.model).subscribe(data => { 
        console.log(this.data);
        this.sendLoading = false;
    },
    error => {
        this.alertService.error(error);
        this.sendLoading = false;
    });
  };

}
