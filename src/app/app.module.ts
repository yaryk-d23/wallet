import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { HttpModule } from '@angular/http';
import { LoadingModule } from 'ngx-loading';
import { NgxPaginationModule } from 'ngx-pagination';
// used to create fake backend
import { BaseRequestOptions } from '@angular/http';

import { AppComponent }  from './app.component';
import { routing }        from './app.routing';

import { AlertComponent, PreloaderComponent } from './_directives/index';
import { AuthGuard } from './_guards/index';
import { AlertService, AuthenticationService, UserService, Base64Service, PreloaderService } from './_services/index';

import { AmountTranformPipe } from './pipes/';
import { FilterPipe } from './pipes/';

import { WalletComponent } from './wallet/wallet.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { SendConfirmationComponent } from './send-confirmation/send-confirmation.component';
import { UserConfirmationComponent } from './user-confirmation/user-confirmation.component'

// style
import { MaterializeModule } from 'angular2-materialize';

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
    UserConfirmationComponent
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    LoadingModule,
    NgxPaginationModule,
    MaterializeModule
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

