import {Injectable} from "@angular/core";
import {BaseApiService} from "./base-api.service";
import {BehaviorSubject, catchError, map, Observable, of, Subject, tap, throwError} from "rxjs";
import {HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {AuthData, SuccessResponse} from "../../models/auth";
import {Router} from "@angular/router";
import {User} from "../../models/user";
import {AuthUser} from "../../models/auth-user.model";
import {LocalStorageService} from "../local-storage.service";

@Injectable({providedIn: "root"})
export class AuthService {

  //inject BaseApiService instead of extend

  authUser = new BehaviorSubject<AuthUser | null>(null);

  constructor(private baseAPIService: BaseApiService, private storageService: LocalStorageService) {
  }


  // use this method in guards
  checkIsLoggedIn(): AuthUser | null {
    return this.authUser.value
  }


  /**
   * make api call to register new user
   * @param user
   */
  registerUser(user: User): Observable<User> {
    return this.baseAPIService.post<User>('registration', user);
  }

  /**
   * make login API call
   * @param email
   * @param password
   */
  login(email: string, password: string): Observable<AuthData> {
    return this.baseAPIService.post<AuthData>('login', {email: email, password: password})
      .pipe(
        tap((data) => {
          const authUser = new AuthUser(data.userId, data.token, data.expiresAt);
          this.storageService.setUser(authUser)
          this.authUser.next(authUser);
        })
      );
  }


  /**
   * make logout API call.
   */
  logout() {
    this.storageService.removeUser();
    this.authUser.next(null);
    return this.baseAPIService.post('logout', {});
  }


  /**
   * validate the user token
   */
  validateUser(token: string): Observable<{ isValid: boolean, userId: number }> {
    return this.baseAPIService.get<{
      isValid: boolean,
      userId: number
    }>('validate-token', undefined, new HttpHeaders().set('Authorization', 'Bearer ' + token)
    );
  }


  // autoLogin() {
  //   let storageString = localStorage.getItem('user');
  //   if (!storageString) {
  //     return;
  //   }
  //   let authUser: AuthData = JSON.parse(storageString);
  //   if (new Date(authUser.expiresAt).getTime() < new Date().getTime()) {
  //     this.authUser.next(null);
  //     localStorage.removeItem('user');
  //     return;
  //   }
  //   this.authUser.next(authUser);
  // }


  // isAuthenticated(): boolean {
  //   let storageString = localStorage.getItem('user');
  //   if (!storageString) {
  //     return false;
  //   }
  //   let authUser: AuthData = JSON.parse(storageString);
  //   if (new Date(authUser.expiresAt).getTime() < new Date().getTime()) {
  //     return false;
  //   }
  //   return true;
  // }

}
