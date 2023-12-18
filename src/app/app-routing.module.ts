import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UserListComponent} from "./user-list/user-list.component";
import {authenticationGuard} from "./auth/guards/auth.guard";
import {guestGuard} from "./auth/guards/guest.guard";

const routes: Routes = [
  // {path: 'auth', component: LoginComponent, canActivate: [guestGuard()]},
  // {path: 'registration', component: RegistrationComponent, canActivate: [guestGuard()]},

  {path: 'auth', loadChildren: () => import('./auth/auth.module').then(module => module.AuthModule), canMatch:[guestGuard()]},
  {path: 'items', loadChildren: () => import('./inventory/inventory.module').then(module => module.InventoryModule)},
  {path: '', redirectTo: '/auth', pathMatch: 'full'},

  {path: 'users', component: UserListComponent, canActivate: [authenticationGuard()]},
  // {path: 'users/:id', component: UserDetailComponent, canActivate: [authenticationGuard()]},

  //user profile
  // {path: 'profile', component: ProfileComponent, canActivate: [authenticationGuard()]},
  {
    path: 'settings',
    loadChildren: () => import('./user-settings/user-settings.module').then(module => module.UserSettingsModule)
  },


  // {
  //   path: '', children: [
  //     {path: 'users', component: UserListComponent, canActivate: []},
  //     {path: 'add-user', component: UserComponent},
  //     {path: 'users/:id', component: UserDetailComponent},
  //   ]
  //
  // },

  // route grouping
  // {
  //   path: 'users', children: [
  //     {path: 'add', component: UserListComponent, canActivate: []},
  //     {path: ':id/edit', component: UserComponent},
  //     {path: ':id/detail', component: UserDetailComponent},
  //   ],
  //   //main route + child route
  //   canActivate:[],
  //   // only child route
  //   canActivateChild:[]
  // }

];

@NgModule({
  // Router module registration. forRoot is used for registering the routes.
  imports: [RouterModule.forRoot(routes)],
  // modules that we are required to be exported if this module is imported to another module.
  // e.g. if we import this module to app module then only Router module will be exported
  exports: [RouterModule]
})
export class AppRoutingModule {
}
