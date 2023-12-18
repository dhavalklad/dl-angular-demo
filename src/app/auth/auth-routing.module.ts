import {NgModule} from "@angular/core";
import {Route, RouterModule} from "@angular/router";
import {LoginComponent} from "./login/login.component";
import {RegistrationComponent} from "./registration/registration.component";
import {guestGuard} from "./guards/guest.guard";


const authRoutes: Route[] = [
    {path: '', component: LoginComponent},
    {path: 'registration', component: RegistrationComponent}
];

@NgModule({
    imports: [RouterModule.forChild(authRoutes)],
    exports: [RouterModule]
})
export class AuthRoutingModule {

}
