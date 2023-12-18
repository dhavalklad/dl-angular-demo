import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "../shared/services/api/auth.service";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  authSubscription!: Subscription;
  isLoggedIn: boolean = false;
  isLoading: boolean = false;

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    this.authSubscription = this.authService.authUser.subscribe(user => {
      console.log('header user', user);
      this.isLoggedIn = !!user;
    });

  }

  onLogout() {
    console.log('logout called');
    // if (this.isLoading) {
    //     return;
    // }
    // this.isLoading = true;
    this.authService.logout().subscribe();
    this.router.navigate(['/auth']);
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }


}
