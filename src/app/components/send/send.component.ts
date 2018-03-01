import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User, Wallet, SendRequest, Fee } from '../../_models/index';
import { AlertService, UserService, PreloaderService } from '../../_services/index';

@Component({
  selector: 'send',
  templateUrl: './send.component.html',
  styleUrls: ['./send.component.css']
})
export class SendComponent implements OnInit {
  model: SendRequest = new SendRequest();
  sendForm: any;
  feeInform: Fee = new Fee();
  amountWithFee: any = {
      amount: 0,
      fee: 0
  };
  coeficient: number = 1000000000000;
  constructor(
    private userService: UserService,
    private alertService: AlertService,
    private preloaderService: PreloaderService) { }

  ngOnInit() {
    this.getCurrentFee();
  }

  @Input() 
    walletData: any;
  @Output()
    updateWalletData = new EventEmitter();

  public sendData(form: any): void {
    this.preloaderService.show();
    let tmpData = {...this.model};
    tmpData.amount = tmpData.amount * this.coeficient;
    this.userService.sendData(tmpData).subscribe(data => { 
        this.updateWalletData.emit();
        this.alertService.success(data);
        //this.model = new SendRequest();
        form.onReset();
        //this.switchActiveTab('History');
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
    if(!this.walletData.balance.available) return;
    let maxAmount = 0;
    let feeForMaxAmount = 0;
    if(this.model.amount !== null || this.feeInform.baseFee) {
        feeForMaxAmount = this.feeInform.baseFee + (this.walletData.balance.available * this.feeInform.additionalFeeCoefficient);
        maxAmount = this.walletData.balance.available - feeForMaxAmount;        
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
    this.model.amount = this.walletData.balance.available * 1000000000000;
    this.getTotalAmount();
  }


}
