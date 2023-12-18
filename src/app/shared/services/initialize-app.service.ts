import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {AuthData} from "../models/auth";
import {AuthService} from "./api/auth.service";
import {catchError, Observable, of, tap} from "rxjs";
import {Router} from "@angular/router";
import {LocalStorageService} from "./local-storage.service";

@Injectable({providedIn: "root"})
export class InitializeAppService {
  constructor(private authService: AuthService, private storageService: LocalStorageService) {
  }

  initialize() {
    // return (): Observable<any> => {
    return (): Observable<any> => {
      console.log('app init called');
      //check if storage data available
      if (!this.storageService.isUserAvailable()) {
        this.authService.authUser.next(null);
        return of(null);
      }
      // check if storage token expiry
      const user = this.storageService.getUser();
      if (user.isTokenExpired()) {
        this.storageService.removeUser();
        this.authService.authUser.next(null);
        return of(null);
      }
      // validate local storage token
      return this.authService.validateUser(user.token).pipe(
        tap((data) => {
          user.userId = data.userId;
          this.storageService.setUser(user);
          this.authService.authUser.next(user);
        }),
        catchError(error => {
          console.log('redirecting from init');
          this.storageService.removeUser();
          this.authService.authUser.next(null);
          return of(null);
        })
      );
    }
  }
}
