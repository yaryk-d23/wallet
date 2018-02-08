import { Component, OnInit } from '@angular/core';
import { AlertService, UserService, PreloaderService, Base64Service } from '../../_services/index';
import { NewPassword } from '../../_models/index';

@Component({
  moduleId: module.id,
  templateUrl: './manage-account.component.html',
  styleUrls: ['./manage-account.component.css']
})
export class ManageAccountComponent implements OnInit {

  newPassword = new NewPassword();
  confirmNewPassword: string = '';
  constructor(
    private base64Service: Base64Service,
    private userService: UserService,
    private alertService: AlertService,
    private preloaderService: PreloaderService) { }

  private currentUser: string = '';
  
  ngOnInit() {
    this.newPassword.email = this.getCurrentUser();
  }

  private getCurrentUser(): string {
    let authData = JSON.parse(localStorage.getItem('currentSession')),
        userData = this.base64Service.encode(authData.token);
    return userData.split(':')[0]
  }

  public changePassword() {
    this.preloaderService.show();
    this.userService.changePassword(this.newPassword).subscribe(data => { 
          this.preloaderService.hide();
          this.alertService.error(data);;
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
