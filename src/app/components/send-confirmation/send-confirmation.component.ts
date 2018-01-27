import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService, UserService, PreloaderService } from '../../_services/index';
import { error } from 'util';

@Component({
  selector: 'app-send-confirmation',
  templateUrl: './send-confirmation.component.html',
  styleUrls: ['./send-confirmation.component.css']
})
export class SendConfirmationComponent implements OnInit {

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
    this.confirmSend();
  }

  public confirmSend(): void {
    this.userService.confirmSend(this.token).subscribe(res => {
      this.message.message = res.message;
      this.message.status = "SUCCESS";
      this.preloaderService.hide();
    }, error => {
      this.message.message = JSON.parse(error._body).message;
      this.message.status = "ERROR";
      this.preloaderService.hide(); 
    });
  }

}
