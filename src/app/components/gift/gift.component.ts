import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService, UserService, PreloaderService } from '../../_services/index';
import { Gift } from '../../_models/index';
@Component({
  selector: 'gift',
  templateUrl: './gift.component.html',
  styleUrls: ['./gift.component.css']
})
export class GiftComponent implements OnInit {
  token: string;
  model: Gift;
  expTime: string;
  address: string;

  constructor(    
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private alertService: AlertService,
    private preloaderService: PreloaderService) { 
      this.token = this.route.snapshot.queryParams['token'] || '/';
      this. address = '';
    }


  ngOnInit() {
    this.GetGift();
  }

  public GetGiftExpiration(expDate: string){
    // Set the date we're counting down to
    var countDownDate = new Date(expDate).getTime();

    // Update the count down every 1 second
    var x = setInterval(function() {

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
      this.expTime = days + "d " + hours + "h "
      + minutes + "m " + seconds + "s ";

      // If the count down is finished, write some text 
      if (distance < 0) {
        clearInterval(x);
        this.expTime = "EXPIRED";
      }
    }, 1000);
  }

  public GetGift(){
    this.preloaderService.show(); 
    this.userService.getGift(this.token).subscribe(res => {
      this.preloaderService.hide();
      this.model.amount = res.amount;
      this.model.paymentId = res.paymentId;
      this.model.expiration = res.expiration;
    }, error => {
      this.preloaderService.hide();       
      if(error._body == ""){
        error._body = {status: 'ERROR', message: error.statusText}; 
      }
      this.alertService.error(error._body);
    });
  }


}
