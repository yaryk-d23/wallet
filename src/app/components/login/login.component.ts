import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
 
import { AlertService, AuthenticationService, Base64Service } from '../../_services/index';
declare var Materialize:any;
@Component({
    moduleId: module.id,
    templateUrl: 'login.component.html'
})
 
export class LoginComponent implements OnInit {
    model: any = {};
    loading = false;
    returnUrl: string;
 
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService,
        private base64Service: Base64Service ) { }
 
    ngOnInit() {
        // reset login status
        this.authenticationService.logout();
 
        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

        setTimeout(() => {Materialize.updateTextFields();},100);
    }
    
 
    login() {
        this.loading = true;
        let authToken = this.getAuthdata(this.model.username, this.model.password);        
        this.authenticationService.login(authToken)
            .subscribe(
                data => {
                    this.router.navigate([this.returnUrl]);
                },
                error => {
                    if(error.status == 401 && error._body == '') {
                        error._body = {
                            message: 'Email or password is not correct',
                            status: 'ERROR'
                        };
                    }
                    this.alertService.error(error._body);
                    this.loading = false;
                });
    }

    private getAuthdata(username: string, password: string) {
        let token = this.base64Service.code(username+":"+password);
        return token;
    }
}
