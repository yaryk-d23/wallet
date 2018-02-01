import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService, UserService, PreloaderService } from '../../_services/index';
import { error } from 'util';

@Component({
  selector: 'app-user-confirmation',
  templateUrl: './user-confirmation.component.html',
  styleUrls: ['./user-confirmation.component.css']
})
export class UserConfirmationComponent implements OnInit {

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
    this.confirmRegistration();
  }

  public confirmRegistration(): void {
    this.userService.confirmRegistration(this.token).subscribe(res => {
      this.preloaderService.hide(); 
      this.message.message = res.message;
      this.message.status = "OK";
    }, error => {
      if(error._body == ""){
        error._body = error.statusText; 
      }
      this.message.message = error._body;
      this.message.status = "ERROR";
      this.preloaderService.hide(); 
    });
  }

}
