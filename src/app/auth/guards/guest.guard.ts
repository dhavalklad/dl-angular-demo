import {inject} from "@angular/core";
import {AuthService} from "../../shared/services/api/auth.service";
import {CanActivateFn, Router} from "@angular/router";

export function guestGuard(): CanActivateFn {
  return () => {
    console.log('guestGuard');
    const authService = inject(AuthService);
    const route = inject(Router);
    if (authService.checkIsLoggedIn()) {
      return route.createUrlTree(['/users']);
    }
    return true;
  }
}
