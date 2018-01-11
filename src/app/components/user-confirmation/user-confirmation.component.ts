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
      this.message = {ok: false};
    }

  ngOnInit() {
    this.preloaderService.show(); 
    this.confirmRegistration();
  }

  public confirmRegistration(): void {
    this.userService.confirmRegistration(this.token).subscribe(res => {
      this.preloaderService.hide(); 
      this.message = res;
    }, error => {
      this.preloaderService.hide(); 
      this.message = error;
    });
  }

}
