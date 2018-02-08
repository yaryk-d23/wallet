import { Component, OnInit } from '@angular/core';
import { AlertService, UserService, PreloaderService, Base64Service } from '../../_services/index';
import { NewPassword } from '../../_models/index';
import { Router } from '@angular/router';

@Component({
  moduleId: module.id,
  templateUrl: './restore-password.component.html',
  styleUrls: ['./restore-password.component.css']
})
export class RestorePasswordComponent implements OnInit {

  newPassword = new NewPassword();
  confirmNewPassword: string = '';
  constructor(
    private userService: UserService,
    private alertService: AlertService,
    private preloaderService: PreloaderService,
    private router: Router) { }
  
  ngOnInit() {
  }

  public changePassword() {
    this.preloaderService.show();
    this.userService.changePassword(this.newPassword).subscribe(data => { 
          this.preloaderService.hide();
          this.alertService.error(data);
          this.router.navigateByUrl('/login');
      },
      error => {
          this.preloaderService.hide();
          if(error._body == ""){
              error._body = {status: 'ERROR', message: error.statusText}; 
          }
          this.alertService.error(error._body);;
    });
  }

}
