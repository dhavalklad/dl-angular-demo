import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UserComponent} from "./user/user.component";
import {UserDetailComponent} from "./user-detail/user-detail.component";
import {UserListComponent} from "./user-list/user-list.component";

const routes: Routes = [
    {path: 'users', component: UserListComponent},
    {path: 'add-user', component: UserComponent},
    {path: 'users/:id', component: UserDetailComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
