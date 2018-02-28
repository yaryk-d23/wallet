import { Routes, RouterModule } from '@angular/router';

import { WalletComponent } from './components/wallet/wallet.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { UserConfirmationComponent } from './components/user-confirmation/user-confirmation.component';
import { SendConfirmationComponent } from './components/send-confirmation/send-confirmation.component';
import { ManageAccountComponent } from './components/manage-account/manage-account.component';
import { RestorePasswordComponent } from './components/restore-password/restore-password.component';
import { AuthGuard } from './_guards/index';

const walletChildrenRoutes: Routes = [
    { path: 'receive', component: LoginComponent},
    { path: 'history', component: LoginComponent},
    { path: 'send', component: LoginComponent},
    { path: 'gift', component: LoginComponent},
];

const appRoutes: Routes = [
    { 
        path: '', 
        component: WalletComponent, 
        canActivate: [AuthGuard], 
        pathMatch: 'full',
        // children: walletChildrenRoutes
    },
    { path: 'login', component: LoginComponent},
    { path: 'register', component: RegisterComponent},
    { path: 'userconfirmation', component: UserConfirmationComponent},
    { path: 'sendconfirmation', component: SendConfirmationComponent},
    { path: 'account', component: ManageAccountComponent, canActivate: [AuthGuard], pathMatch: 'full' },
    { path: 'restore-password', component: RestorePasswordComponent },
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];


export const routing = RouterModule.forRoot(appRoutes, { useHash: true });