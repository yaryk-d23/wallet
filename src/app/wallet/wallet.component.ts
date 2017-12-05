import { Component, OnInit } from '@angular/core';

import { User } from '../_models/index';
import { UserService } from '../_services/index';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})
export class WalletComponent implements OnInit {

  currentUser: User;
  data: any = {};
  loading: boolean = true;

  constructor(private userService: UserService) {
      this.currentUser = JSON.parse(localStorage.getItem('currentSession'));
  }

  ngOnInit() {
      this.loadWalletData();
  }


  private loadWalletData() {
    this.userService.getWalletData().subscribe(data => { 
        this.data =  {
            wallets: data[0], 
            transactions: data[1]
        }; 
        this.loading = false;
    });
  }

}
