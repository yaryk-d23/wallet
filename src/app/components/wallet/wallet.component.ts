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
  
  data: Wallet = new Wallet();
  qrData: SendRequest = new SendRequest();
  
  
  constructor(
    private userService: UserService,
    private alertService: AlertService,
    private preloaderService: PreloaderService) {
      this.currentUser = JSON.parse(localStorage.getItem('currentSession'));
  }

  ngOnInit() {
    this.preloaderService.show();      
    this.loadWalletData();
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

//   public sortTable(array: any[], field: string = 'time'): any {
//     let sortOrder = this.sortOrder ? 1 : -1;
//     let sortProperty = sortOrder ? field.split('-')[1] : field;
//     let sortebleArray = array.sort((a,b): any => { 
//         var result = (a[field] > b[field] ) ? 1 : ((b[field]  > a[field] ) ? -1 : 0);
//         return result * sortOrder;
//     });
//     return sortebleArray;
//   }

  public switchActiveTab(tabName: string): void{
    let tabs: any = document.querySelectorAll("ul[materialize=tabs]>li>a");
    let newActiveTab: any;
    tabs.forEach(element => {
        if(element.children[1].innerText === tabName)
            newActiveTab = element;
    });
    newActiveTab.click();
  }

  public setSendForm(qrData:string){
    this.switchActiveTab("Send");
    this.qrData = {...this.parseQRStringToObject(qrData)};
    // if(this.qrData.amount)
    //     this.getTotalAmount();
  }

  private parseQRStringToObject(qrString: string): SendRequest{
    let tmpString = qrString;
    let newSendData = new SendRequest();
    let tmoObj: any = {};
    let address: string;
    if(tmpString.indexOf('karbowanec:') != -1){
      address = tmpString.split('?')[0].split(":")[1];
    }
    else {
      address = tmpString.split('?')[0];
    }
    tmoObj["karbowanec"] = this.validateQrcodeParams(address, 'address');
    tmpString = tmpString.split("?")[1];
    if(tmpString){
        tmpString.split("&").forEach((param) => {
            let name = param.split("=")[0],
                value = param.split("=")[1];
            if(name && value)
                tmoObj[name] = this.validateQrcodeParams(value, name);
        })
    }
    newSendData.address = tmoObj.karbowanec ? tmoObj.karbowanec : "";
    newSendData.amount = tmoObj.amount ? tmoObj.amount : 0;
    newSendData.paymentId = tmoObj.payment_id ? tmoObj.payment_id : "";
    return newSendData;
  }

  private validateQrcodeParams(value:string, type:string){
    let validValue = "";
    switch(type){
      case "address":
        validValue = /^K[123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]{94}$/.test(value) ? value : "";
        break;
      case "amount":
      validValue = /^[+]?\d+(\.\d+)?$/.test(value) ? value : "";
        break;
      case "paimantId":
        validValue = /^[0-9A-Fa-f]{64}$/.test(value) ? value : "";
        break;
      default:
        validValue = value
        break;
    }
    return validValue;
  }

}
