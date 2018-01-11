import { Routes, RouterModule } from '@angular/router';

import { WalletComponent } from './components/wallet/wallet.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { UserConfirmationComponent } from './components/user-confirmation/user-confirmation.component';
import { SendConfirmationComponent } from './components/send-confirmation/send-confirmation.component';
import { AuthGuard } from './_guards/index';

const appRoutes: Routes = [
    { path: '', component: WalletComponent, canActivate: [AuthGuard], pathMatch: 'full' },
    { path: 'login', component: LoginComponent},
    { path: 'register', component: RegisterComponent},
    { path: 'userconfirmation', component: UserConfirmationComponent},
    { path: 'sendconfirmation', component: SendConfirmationComponent},

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes, { useHash: true });