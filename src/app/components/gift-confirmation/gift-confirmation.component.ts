import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService, UserService, PreloaderService } from '../../_services/index';
import { Gift } from '../../_models/index';

@Component({
  selector: 'gift-confirmation',
  templateUrl: './gift-confirmation.component.html',
  styleUrls: ['./gift-confirmation.component.css']
})
export class GiftConfirmationComponent implements OnInit {
  token: string;
  message: any;
  
  constructor(    
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private alertService: AlertService,
    private preloaderService: PreloaderService) { 
      this.token = this.route.snapshot.queryParams['token'] || '/';
      this.message = {
        message: "",
        status: ""
      };
    }


  ngOnInit() {
    this.preloaderService.show(); 
    this.ConfirmGift();
  }

  public ConfirmGift(): void {
    this.preloaderService.show();     
    this.userService.confirmGift(this.token).subscribe(res => {
      this.message.message = "Gift has been confirmed";
      this.message.status = "SUCCESS";
      this.preloaderService.hide();
      setTimeout(() => {
        location.href = res.url;
      }, 3000);
    }, error => {
      console.log(error);
      if(error._body == ""){
        error._body = error.statusText; 
      }
      this.message.message = "Error! Sorry something's wrong.";
      this.message.status = "ERROR";
      this.preloaderService.hide(); 
    });
  }

}
