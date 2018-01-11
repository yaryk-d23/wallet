import { Component, OnInit, Input } from '@angular/core';
import { ReceiveRequest } from '../../_models/index';
import { AlertService, UserService, PreloaderService } from '../../_services/index';

@Component({
  moduleId: module.id,
  selector: 'receive',
  templateUrl: './receive.component.html',
  styleUrls: ['./receive.component.css']
})
export class ReceiveComponent implements OnInit {

  receiveData: ReceiveRequest = new ReceiveRequest();

  constructor(
    private userService: UserService,
    private alertService: AlertService,
    private preloaderService: PreloaderService) { }

  ngOnInit() {
    //this.receiveData.address = this.wallet;
  }

  @Input() wallets: any[];

  elementType : 'url' | 'canvas' | 'img' = 'url';
  qrValue: string = "karbowanec:";

  private generateQRcode():void {
    this.qrValue += this.wallets[0].address + '?';
    if(this.receiveData.amount)
      this.qrValue += 'amount=' + this.receiveData.amount + '&';
    if(this.receiveData.paymentId)
      this.qrValue += 'payment_id=' + this.receiveData.paymentId + '&';
    if(this.receiveData.label)
      this.qrValue += 'label=' + this.receiveData.label;
  }

  private generatePaymentId(): void {
    this.preloaderService.show();    
    this.userService.getPaymentId().subscribe(data => { 
      this.receiveData.paymentId = data.paymentId;
      this.preloaderService.hide();
    },
    error => {
        this.preloaderService.hide();
        this.alertService.error(error);
    });
  };

}
