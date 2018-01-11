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
      this.message = {ok: false};
    }

  ngOnInit() {
    this.preloaderService.show(); 
    this.confirmSend();
  }

  public confirmSend(): void {
    this.userService.confirmSend(this.token).subscribe(res => {
      this.preloaderService.hide(); 
      this.message = res;
    }, error => {
      this.preloaderService.hide(); 
      this.message = error;
    });
  }

}
