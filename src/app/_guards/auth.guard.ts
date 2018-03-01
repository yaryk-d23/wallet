import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserService } from '../_services/index';
@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private router: Router, 
        private userService: UserService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
        return new Promise((resolve, reject) => { this.userService.getCurrentUser().subscribe(data => {
                    // logged in so return true
                    resolve(true);
                },error=>{
                    // not logged in so redirect to login page with the return url
                    this.router.navigate(['login'], { queryParams: { returnUrl: state.url }});
                    resolve(false);
            });
        });
        
    }
}