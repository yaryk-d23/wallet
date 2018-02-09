import { Component, OnInit, ViewChildren } from '@angular/core';
import { User, Wallet, SendRequest, Fee } from '../../_models/index';
import { AlertService, UserService, PreloaderService } from '../../_services/index';

declare var Materialize:any;
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
  coeficient: number = 1000000000000;
  
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
  }


  public loadWalletData() {
    this.userService.getWalletData().subscribe(data => { 
        this.data =  {
            wallets: data[0], 
            transactions: data[1],
            balance: data[2]
        }; 
        this.preloaderService.hide();
    },
    error => {
        if(error._body == ""){
            error._body = {status: 'ERROR', message: error.statusText}; 
        }
        this.alertService.error(error._body);
        this.preloaderService.hide();
    });
  }

  public sendData(form: any): void {
    this.preloaderService.show();
    let tmpData = {...this.model};
    tmpData.amount = tmpData.amount * this.coeficient;
    this.userService.sendData(tmpData).subscribe(data => { 
        this.loadWalletData();
        this.alertService.success(data);
        //this.model = new SendRequest();
        form.onReset();
        this.switchActiveTab('History');
        this.preloaderService.hide();
    },
    error => {
        this.preloaderService.hide();
        if(error._body == ""){
            error._body = {status: 'ERROR', message: error.statusText}; 
        }
        this.alertService.error(error._body);;
    });
  };

  public generatePaymentId(): void {
    this.preloaderService.show();    
    this.userService.getPaymentId().subscribe(
        data => { 
            this.model.paymentId = data.paymentId;
            this.preloaderService.hide();
        },
        error => {
            this.preloaderService.hide();
            if(error._body == ""){
                error._body = {status: 'ERROR', message: error.statusText}; 
            }
            this.alertService.error(error._body);
        });
  };

  public getCurrentFee(): void {
    this.userService.getFee().subscribe(data => { 
        this.feeInform = data;
    },
    error => {
        if(error._body == ""){
            error._body = {status: 'ERROR', message: error.statusText}; 
        }
        this.alertService.error(error._body);
    });
    };

  public getTotalAmount(): void {
    if(!this.data.balance.available) return;
    let maxAmount = 0;
    let feeForMaxAmount = 0;
    if(this.model.amount !== null || this.feeInform.baseFee) {
        feeForMaxAmount = this.feeInform.baseFee + (this.data.balance.available * this.feeInform.additionalFeeCoefficient);
        maxAmount = this.data.balance.available - feeForMaxAmount;        
        if(maxAmount < (this.model.amount * this.coeficient) || this.model.allAvailableBalance) {
            this.amountWithFee.fee = +(feeForMaxAmount.toFixed(12));
            this.amountWithFee.amount = +((maxAmount + this.amountWithFee.fee).toFixed(12));
            this.model.amount = +((maxAmount / this.coeficient).toFixed(12));
        }
        else{
            this.amountWithFee.fee = +((this.feeInform.baseFee + ((this.model.amount * this.coeficient) * this.feeInform.additionalFeeCoefficient)).toFixed(12));                    
            this.amountWithFee.amount = +((this.model.amount * this.coeficient + this.amountWithFee.fee).toFixed(12));
        }
    }
  }

  public setFullAmount(): void {
    this.model.amount = this.data.balance.available * 1000000000000;
    this.getTotalAmount();
  }

  public copyToClipboard(text: string): void {
    var textarea = document.createElement("textarea");
    textarea.textContent = text;
    textarea.style.position = "fixed"; 
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("Copy");
    document.body.removeChild(textarea);
    Materialize.toast('Copied!', 1000)
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

  public switchActiveTab(tabName: string): void{
    let tabs: any = document.querySelectorAll("ul[materialize=tabs]>li>a");
    let newActiveTab: any;
    tabs.forEach(element => {
        if(element.children[1].innerText === tabName)
            newActiveTab = element;
    });
    newActiveTab.click();
  }

}
