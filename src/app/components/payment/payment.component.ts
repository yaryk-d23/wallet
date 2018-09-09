import { Component, OnInit } from '@angular/core';
import { ReceiveRequest } from '../../_models/index';
import { AlertService, UserService, PreloaderService } from '../../_services/index';
import { SendRequest } from '../../_models/index';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  data: SendRequest = new SendRequest();
  userName: string = '';
  blockiesOptions: any = { 
    seed: '', 
    color: '#ffed00', 
    bgcolor: '#000', 
    size: 8, 
    scale: 3, 
    spotcolor: '#2196F3'
  }

  constructor(
    private userService: UserService,
    private alertService: AlertService,
    private preloaderService: PreloaderService,
    private route: ActivatedRoute) { }


  ngOnInit() {
    this.preloaderService.show();
    this.route.params.subscribe(params => {
      this.userName = params["userName"];
      this.blockiesOptions.seed =  this.userName;
      this.getAddress(this.userName);
    });
  }


  elementType : 'url' | 'canvas' | 'img' = 'url';
  qrValue: string = "";

  private getAddress(userName: string){
    this.userService.getAddressByUserName(userName)
      .subscribe(data => {
        console.log(data);
        this.data.address = data.address;
        this.generateQRcode();
      },
      error => {
        error._body = JSON.parse(error._body)
        this.userName = 'Not Found';
        this.data.address = error._body.message;
        this.alertService.error(error._body);
        this.preloaderService.hide();
      });
  }

  public generatePaymentId(): void {
    this.preloaderService.show();   
    this.userService.getPaymentId().subscribe(data => { 
      this.data.paymentId = data.paymentId;
      this.preloaderService.hide();
    },
    error => {
        this.preloaderService.hide();
        this.alertService.error(error);
    });
  };

  private generateQRcode():void {
    this.preloaderService.show();
    let newQRLink = 'karbowanec:';    
    newQRLink += this.data.address + '?';
    if(this.data.amount)
      newQRLink += 'amount=' + this.data.amount + '&';
    if(this.data.paymentId)
      newQRLink += 'payment_id=' + this.data.paymentId + '&';
    if(newQRLink[newQRLink.length -1] == '?' || newQRLink[newQRLink.length -1] == '&')
      newQRLink = newQRLink.slice(0, -1);
    setTimeout(() => {
      this.qrValue = newQRLink;
      this.preloaderService.hide();
    }, 1000);
  }

}
