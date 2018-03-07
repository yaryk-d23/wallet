import { Routes, RouterModule } from '@angular/router';

import { WalletComponent } from '../../components/wallet/wallet.component';
import { ReceiveComponent } from '../../components/receive/receive.component';
import { SendComponent } from '../../components/send/send.component';
import { HistoryComponent } from '../../components/history/history.component';
import { ManageAccountComponent } from '../../components/manage-account/manage-account.component';
import { AuthGuard } from '../../_guards/index';

const walletChildrenRoutes: Routes = [
    { path: '', redirectTo: 'history', pathMatch: 'full'},
    { path: 'receive', component: ReceiveComponent},
    { path: 'history', component: HistoryComponent},
    { path: 'send', component: SendComponent},
    { path: 'account', component: ManageAccountComponent, canActivate: [AuthGuard], pathMatch: 'full' },

    //{ path: 'gift', component: LoginComponent},
];

export const walletRouting = RouterModule.forChild(walletChildrenRoutes);