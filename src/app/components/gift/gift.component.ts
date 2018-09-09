import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService, UserService, PreloaderService } from '../../_services/index';
import { Gift, ExpirationTime } from '../../_models/index';
@Component({
  selector: 'gift',
  templateUrl: './gift.component.html',
  styleUrls: ['./gift.component.css']
})
export class GiftComponent implements OnInit {
  token: string;
  model: Gift;
  sendAddress: string  = '';
  expTime: ExpirationTime;
  coeficient: number = 1000000000000;
  constructor(    
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private alertService: AlertService,
    private preloaderService: PreloaderService) { 
      this.token = this.route.snapshot.queryParams['token'] || '/';
      this.model = {
        amount: 0,
        paymentId: '',
      };
    }


  ngOnInit() {
    console.log(this.expTime);
    this.GetGift();
  }

  public GetGiftExpiration =(expDate: string)=>{
    // Set the date we're counting down to
    var countDownDate = new Date(expDate).getTime();

    // Update the count down every 1 second
    var x = setInterval(() => {
      // Get todays date and time
      var now = new Date().getTime();

      // Find the distance between now an the count down date
      var distance = countDownDate - now;

      // Time calculations for days, hours, minutes and seconds
      var days = Math.floor(distance / (1000 * 60 * 60 * 24));
      var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);

      // Display the result in the element with id="demo"
      this.expTime = {
        days: days,
        hours: hours,
        minutes: minutes,
        seconds: seconds,
        status: "Valid"
      };

      // If the count down is finished, write some text 
      if (distance < 0) {
        clearInterval(x);
        this.expTime.status = "EXPIRED";
      }
    }, 1000);
  }

  public GetGift(){
    this.preloaderService.show(); 
    this.userService.getGift(this.token).subscribe(res => {
      this.model.amount = res.amount / this.coeficient;
      this.model.paymentId = res.paymentId;
      /*check if date not have time zone */
      if(res.expiration.length <= 19){
        let timeZone = new Date().getTimezoneOffset()* 60000;
        this.model.expiration = new Date(new Date(res.expiration).getTime() - timeZone).toISOString();
      }
      else {
        this.model.expiration = res.expiration;
      }
      this.GetGiftExpiration(this.model.expiration);
      this.preloaderService.hide();
    }, error => {
      this.preloaderService.hide();       
      if(error._body == ""){
        error._body = {status: 'ERROR', message: error.statusText}; 
      }
      this.alertService.error(error._body);
    });
  }

  public ApplyGift(){
    this.preloaderService.show();
    this.userService.getGift(this.token, this.sendAddress).subscribe(res => {
      this.preloaderService.hide();
      this.alertService.error({message:"Gift has been send!",status:"SUCCESS"});
      this.router.navigate(['']);
    }, error => {
      this.preloaderService.hide();  
      console.log(error);     
      this.alertService.error(error.message);
    });
  }




}
