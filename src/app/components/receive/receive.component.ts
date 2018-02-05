import { Component, OnInit, Input } from '@angular/core';
import { ReceiveRequest } from '../../_models/index';
import { AlertService, UserService, PreloaderService } from '../../_services/index';
import {DomSanitizer} from '@angular/platform-browser';

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
    private preloaderService: PreloaderService,
    private sanitizer:DomSanitizer) { }

  ngOnInit() {
    //this.receiveData.address = this.wallet;
  }

  @Input() wallets: any[];

  elementType : 'url' | 'canvas' | 'img' = 'url';
  qrValue: string = "";

  public generateQRcode():void {
    this.preloaderService.show();  
    let newQRLink = 'karbowanec:';    
    newQRLink += this.wallets[0].address + '?';
    if(this.receiveData.amount)
      newQRLink += 'amount=' + this.receiveData.amount + '&';
    if(this.receiveData.paymentId)
      newQRLink += 'payment_id=' + this.receiveData.paymentId + '&';
    if(this.receiveData.label)
      newQRLink += 'label=' + this.receiveData.label;
    setTimeout(() => {
      this.qrValue = newQRLink;
      this.preloaderService.hide();
    }, 1000);
  }

  public generatePaymentId(): void {
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

  public sanitize(url:string){
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }
  

}
