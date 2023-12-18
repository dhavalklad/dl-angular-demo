import {NgModule} from "@angular/core";
import {Route, RouterModule} from "@angular/router";
import {ProfileComponent} from "./profile/profile.component";
import {authenticationGuard} from "../auth/guards/auth.guard";

const settingRoute: Route[] = [
  {path: 'profile', component: ProfileComponent, canActivate: [authenticationGuard()]}
];

@NgModule({
  imports: [RouterModule.forChild(settingRoute)],
  exports: [RouterModule]
})
export class UserSettingsRoutingModule {

}
