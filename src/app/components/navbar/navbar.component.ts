import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { Base64Service, UserService, AlertService, PreloaderService } from '../../_services/index';
import { error } from 'util';
import {MaterializeAction} from 'angular2-materialize';
@Component({
  moduleId: module.id,
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  modalActions = new EventEmitter<string|MaterializeAction>();
  constructor(
              private base64Service: Base64Service,
              private userService: UserService,
              private alertService: AlertService,
              private preloaderService: PreloaderService) { }

  public currentUser: string = '';
  public currentBalance: any = {
    available: 0,
    locked: 0
  };
  public showScanIcon = false;
  public showScanModal = false;
  private timer: any;
  ngOnInit() {
    this.getWalletBalance();
    this.getCurrentUser();
    this.walletListen();
  }
  ngOnDestroy() {
    window.clearInterval(this.timer);
    console.log("timer: "+this.timer);
  }
  
  @Output()
    updateWalletData = new EventEmitter();
  @Output()
    setSendFormFromQRCode = new EventEmitter();

  public openScanModal(){
    this.modalActions.emit({action:"modal",params:['open']});
    this.showScanModal = true;
    
  }
  public closeScanModal(){
    this.showScanModal = false;    
    this.modalActions.emit({action:"modal",params:['close']});
  }

  public getQRCodeData(qrCode: any) {
    this.preloaderService.show();
    
    setTimeout(() => {
      this.setSendFormFromQRCode.emit(qrCode);
      this.closeScanModal();
      this.preloaderService.hide();
    }, 3000);
  }

  private getCurrentUser(): void {
    // let authData = JSON.parse(localStorage.getItem('currentSession')),
    //     userData = this.base64Service.encode(authData.token);
    this.userService.getCurrentUser().subscribe(data => {
      this.currentUser = data.email;
      
      },error=>{
        if(error._body == ""){
          error._body = {status: 'ERROR', message: error.statusText}; 
        }
        this.alertService.error(error._body);
    });
  }

  private getWalletBalance(){
    this.userService.getBalance().subscribe(data => {
      this.currentBalance = data;
    },
      error => {
          if(error._body == ""){
              error._body = {status: 'ERROR', message: error.statusText}; 
          }
          this.alertService.error(error._body);
      });
  }

  private walletListen():void {
    this.timer = setInterval(() => {
        this.userService.getBalance().subscribe(data => { 
            if(this.currentBalance.available !== data.available || this.currentBalance.locked !== data.locked) {
                this.updateWalletData.emit();
                this.alertService.success({message:"Wallet balance has been updated!", status: "SUCCESS"});
           }
        },
        error => {
            if(error._body == ""){
                error._body = {status: 'ERROR', message: error.statusText}; 
            }
            this.alertService.error(error._body);
        });
    },30000);
  }

  private checkVideoDevice(){
    navigator.mediaDevices.enumerateDevices()
      .then(function(MediaDeviceInfo) { 
        MediaDeviceInfo.map(device=>{
          if(device.kind == "videoinput") 
            this.showScanIcon = true;
          }
        );
      })
  }

}
