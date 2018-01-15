import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../_models';
 
import { AlertService, UserService } from '../../_services/index';
 
@Component({
    moduleId: module.id,
    templateUrl: 'register.component.html'
})
 
export class RegisterComponent {
    model: any = {};
    loading = false;
 
    constructor(
        private router: Router,
        private userService: UserService,
        private alertService: AlertService) { }
 
    register() {
        this.loading = true;
        let newUser = new User(this.model);
        this.userService.register(newUser)
            .subscribe(
                data => {
                    console.log(data);
                    this.loading = false;
                    // set success message and pass true paramater to persist the message after redirecting to the login page
                    this.alertService.success(data, true);
                    this.router.navigate(['/login']);
                },
                error => {
                    console.log(error);
                    this.loading = false;
                    this.alertService.error(JSON.parse(error._body));
                });
    }
}