import {Injectable} from "@angular/core";
import {User} from "../../models/user";
import {BaseApiService} from "./base-api.service";
import {catchError, map, Observable, ObservableInput, throwError} from "rxjs";
import {SuccessResponse} from "../../models/auth";

@Injectable({
  providedIn: "root"
})
export class UsersService {


  constructor(public baseAPIService: BaseApiService) {
  }

  // addUser(user: User): Observable<User> {
  //     return this.http.post<User>(this.baseURL + 'users', user).pipe(
  //         //   catchError((err, caught: Observable<User>): ObservableInput<User> => {
  //         //   console.log('error occurred', err.message());
  //         //   return [];
  //         // },
  //         // )
  //         catchError(error => {
  //             console.log('error is ', error);
  //             return throwError(error);
  //         })
  //     );
  // }
  //
  // updateUser(id: number, user: User): Observable<User> {
  //     return this.http.put<User>(this.baseURL + 'users/' + id, user);
  // }
  //
  // deleteUser(id: number) {
  //     return this.http.delete(this.baseURL + 'users/' + id);
  // }
  //
  // getUser(id: number): Observable<User> {
  //     return this.http.get<User>(this.baseURL + 'users/' + id);
  // }

  myProfile(): Observable<User> {
    return this.baseAPIService.get<User>('user');
  }

  // getUsers(): Observable<User[]> {
  //     return this.http.get<User[]>(this.baseURL + 'users');
  // }

  checkUniqueEmail(email: string, userId?: number | null): Observable<{ isEmailExist: boolean }> {
    return this.baseAPIService.post<{
      isEmailExist: boolean
    }>('user/email/validate', {email: email, userId: userId});
  }
}
