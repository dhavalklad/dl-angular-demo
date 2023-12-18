import {APP_INITIALIZER, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {UserListComponent} from './user-list/user-list.component';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from "@angular/common/http";
import {HttpLogInterceptorService} from "./shared/services/api/http-log-interceptor.service";
import {UserFormComponent} from "./shared/components/user-form.component";
// import {LoginComponent} from "./auth/login/login.component";
// import {RegistrationComponent} from "./auth/registration/registration.component";
import {AuthTokenInterceptorService} from "./shared/services/api/auth-token-interceptor.service";
// import {ProfileComponent} from "./user-settings/profile/profile.component";
import {SpinnerComponent} from "./shared/components/spinner/spinner.component";
import {InitializeAppService} from "./shared/services/initialize-app.service";

function initializeApp(initializeAppService:InitializeAppService) {
   return initializeAppService.initialize();
}

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        UserFormComponent,
        UserListComponent,
        // LoginComponent,
        // RegistrationComponent,
        // ProfileComponent,
        SpinnerComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule
    ],
    providers: [
        {provide: HTTP_INTERCEPTORS, useClass: HttpLogInterceptorService, multi: true},
        {provide: HTTP_INTERCEPTORS, useClass: AuthTokenInterceptorService, multi: true},
        {provide: APP_INITIALIZER, useFactory: initializeApp, deps: [InitializeAppService], multi: true}
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
