import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule }    from '@angular/forms';
import { HttpModule } from '@angular/http';
import { LoadingModule } from 'ngx-loading';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxQRCodeModule } from 'ngx-qrcode3';
import { ZXingScannerModule } from '@zxing/ngx-scanner';

// used to create fake backend
import { BaseRequestOptions } from '@angular/http';

import { AppComponent }  from './app.component';
import { routing }        from './app.routing';

import { AlertComponent, PreloaderComponent } from './_directives/index';
import { AuthGuard } from './_guards/index';
import { AlertService, AuthenticationService, UserService, Base64Service, PreloaderService } from './_services/index';

import { AmountTranformPipe } from './pipes/';
import { FilterPipe } from './pipes/';

import { WalletComponent } from './components/wallet/wallet.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ConfirmationComponent } from './components/confirmation/confirmation.component';
import { SendConfirmationComponent } from './components/send-confirmation/send-confirmation.component';
import { UserConfirmationComponent } from './components/user-confirmation/user-confirmation.component'
import { ReceiveComponent } from './components/receive/receive.component';
// style
import { MaterializeModule } from 'angular2-materialize';
import { SendComponent } from './components/send/send.component';
import { ManageAccountComponent } from './components/manage-account/manage-account.component';
import { RestorePasswordComponent } from './components/restore-password/restore-password.component';
import { QrcodeScanerComponent } from './components/qrcode-scaner/qrcode-scaner.component';
import { HistoryComponent } from './components/history/history.component';
import { CreateGiftComponent } from './components/create-gift/create-gift.component';
import { GiftConfirmationComponent } from './components/gift-confirmation/gift-confirmation.component';
import { GiftComponent } from './components/gift/gift.component';
import { PaymentComponent } from './components/payment/payment.component';
import { BlockiesModule } from 'angular-blockies';

@NgModule({
  declarations: [
    AppComponent,
    AlertComponent,
    PreloaderComponent,
    WalletComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    AmountTranformPipe,
    FilterPipe,
    ConfirmationComponent,
    SendConfirmationComponent,
    UserConfirmationComponent,
    ReceiveComponent,
    SendComponent,
    ManageAccountComponent,
    RestorePasswordComponent,
    QrcodeScanerComponent,
    HistoryComponent,
    CreateGiftComponent,
    GiftConfirmationComponent,
    GiftComponent,
    PaymentComponent
    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    routing,
    LoadingModule,
    NgxPaginationModule,
    MaterializeModule,
    NgxQRCodeModule,
    ZXingScannerModule,
    BlockiesModule
  ],
  providers: [
    AuthGuard,
    AlertService,
    PreloaderService,
    AuthenticationService,
    UserService,
    // providers used to create fake backend
    BaseRequestOptions,
    Base64Service,
    
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

