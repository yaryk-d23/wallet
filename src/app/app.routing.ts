import { Routes, RouterModule } from '@angular/router';

import { WalletComponent } from './wallet/wallet.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserConfirmationComponent } from './user-confirmation/user-confirmation.component';
import { SendConfirmationComponent } from './send-confirmation/send-confirmation.component';
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