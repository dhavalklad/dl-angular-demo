import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";
import {UserSettingsRoutingModule} from "./user-settings-routing.module";
import {ProfileComponent} from "./profile/profile.component";

@NgModule({
  declarations:[
    ProfileComponent
  ],
  imports:[
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    UserSettingsRoutingModule
  ]
})
export class UserSettingsModule{

}
