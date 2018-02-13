import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../_models';
 
import { AlertService, UserService } from '../../_services/index';
 
@Component({
    moduleId: module.id,
    templateUrl: 'register.component.html',
	styleUrls: ['./register.component.css']
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
                    this.loading = false;
                    // set success message and pass true parameter to persist the message after redirecting to the login page
                    this.alertService.success(data, true);
                    this.router.navigate(['/login']);
                },
                error => {
                    console.log(error);
                    if(error.status == 401 && error._body == '') {
                        error._body = {
                            message: 'Data is not correct',
                            status: 'ERROR'
                        };
                    }
                    if(typeof error._body === 'string')
                        this.alertService.error(JSON.parse(error._body));
                    else
                        this.alertService.error(error._body);
                    this.loading = false;
                });
    }
}