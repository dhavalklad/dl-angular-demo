import {NgModule} from "@angular/core";
import {LoginComponent} from "./login/login.component";
import {RegistrationComponent} from "./registration/registration.component";
import {CommonModule} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";
import {AuthRoutingModule} from "./auth-routing.module";
import {RouterModule} from "@angular/router";

@NgModule({
    declarations: [
        LoginComponent,
        RegistrationComponent
    ],
    imports: [
        // RouterModule,
        CommonModule,
        ReactiveFormsModule,
        AuthRoutingModule
    ],
    exports: []
})
export class AuthModule {

}
