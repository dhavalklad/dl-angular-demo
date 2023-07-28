import {Injectable} from "@angular/core";
import {User} from "../user";
import {BaseApiService} from "./services/api/base-api.service";
import {catchError, Observable, ObservableInput, throwError} from "rxjs";

@Injectable({
  providedIn: "root"
})
export class UsersService extends BaseApiService {


  constructor() {
    super();
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(this.baseURL + 'users', user).pipe(
      //   catchError((err, caught: Observable<User>): ObservableInput<User> => {
      //   console.log('error occurred', err.message());
      //   return [];
      // },
      // )
      catchError(error => {
        console.log('error is ', error);
        return throwError(error);
      })
    );
  }

  updateUser(user: User) {
  }

  deleteUser(id: number) {
  }

  getUser(id: number) {
  }

  getUsers() {
  }
}
