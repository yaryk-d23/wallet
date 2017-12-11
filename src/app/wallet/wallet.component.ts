import { Component, OnInit, ViewChildren } from '@angular/core';

import { User, Wallet, SendRequest, Fee } from '../_models/index';
import { AlertService, UserService, PreloaderService } from '../_services/index';


@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})


export class WalletComponent implements OnInit {

  currentUser: User;
  model: SendRequest = new SendRequest();
  data: Wallet = new Wallet();
  sendForm: any;
  feeInform: Fee = new Fee();
  amountWithFee: any = {
      amount: 0,
      fee: 0
  };
  sortOrder: boolean = false;
  currentPage: any;
  searchString: string;
    
  constructor(
    private userService: UserService,
    private alertService: AlertService,
    private preloaderService: PreloaderService) {
      this.currentUser = JSON.parse(localStorage.getItem('currentSession'));
  }

  ngOnInit() {
    this.preloaderService.show();      
    this.loadWalletData();
    this.getCurrentFee();
    this.walletListen();
  }


  private loadWalletData() {
    this.userService.getWalletData().subscribe(data => { 
        this.data =  {
            wallets: data[0], 
            transactions: data[1],
            balance: data[2]
        }; 
        this.preloaderService.hide();
    },
    error => {
        this.alertService.error(error);
        this.preloaderService.hide();
    });
  }

  private walletListen():void {
    setInterval(() => {
        this.userService.getWalletNumber().subscribe(data => { 
            if(this.data.balance.available !== data.available || this.data.balance.locked !== data.locked) {
                this.loadWalletData();
                this.alertService.success("Wallet balance has been update!");
           }
        },
        error => {
            this.alertService.error(error);
        });
    },30000);
  }

  public sendData(): void {
    this.preloaderService.show();
    let tmpData = this.model;
    tmpData.amount = tmpData.amount * 1000000000000;
    this.userService.sendData(tmpData).subscribe(data => { 
        this.preloaderService.hide();
    },
    error => {
        this.preloaderService.hide();
        this.alertService.error(error);
    });
  };

  public generatePaymentId(): void {
    this.preloaderService.show();    
    this.userService.getPaymentId().subscribe(data => { 
      this.model.paymentId = data.paymentId;
      this.preloaderService.hide();
    },
    error => {
        this.preloaderService.hide();
        this.alertService.error(error);
    });
  };

  public getCurrentFee(): void {
    this.userService.getFee().subscribe(data => { 
        this.feeInform = data;
    },
    error => {
        this.alertService.error(error);
    });
    };

  public getTotalAmount(): void {
    let coeficient = 1000000000000;
    let maxAmount = 0;
    let feeForMaxAmount = 0;
    if(this.model.amount !== null || this.feeInform.baseFee) {
        feeForMaxAmount = this.feeInform.baseFee + (this.data.balance.available * this.feeInform.additionalFeeCoefficient);
        maxAmount = this.data.balance.available - feeForMaxAmount;        
        if(maxAmount < (this.model.amount * coeficient) || this.model.allAvailableBalance) {
            this.amountWithFee.fee = +(feeForMaxAmount.toFixed(12));
            this.amountWithFee.amount = +((maxAmount + this.amountWithFee.fee).toFixed(12));
            this.model.amount = +((maxAmount / coeficient).toFixed(12));
        }
        else{
            this.amountWithFee.fee = +((this.feeInform.baseFee + ((this.model.amount * coeficient) * this.feeInform.additionalFeeCoefficient)).toFixed(12));                    
            this.amountWithFee.amount = +((this.model.amount * coeficient + this.amountWithFee.fee).toFixed(12));
        }
    }
  }

  public setFullAmount(): void {
    this.model.amount = this.data.balance.available * 1000000000000;
    this.getTotalAmount();
  }

  public sortTable(array: any[], field: string = 'time'): any {
    let sortOrder = this.sortOrder ? 1 : -1;
    let sortProperty = sortOrder ? field.split('-')[1] : field;
    let sortebleArray = array.sort((a,b): any => { 
        var result = (a[field] > b[field] ) ? 1 : ((b[field]  > a[field] ) ? -1 : 0);
        return result * sortOrder;
    });
    return sortebleArray;
  }

}
