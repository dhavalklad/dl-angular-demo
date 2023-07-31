import {Injectable} from "@angular/core";
import {User} from "../../models/user";
import {BaseApiService} from "./base-api.service";
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
    return this.http.put<User>(this.baseURL + 'users/' + user.id, user);
  }

  deleteUser(id: number) {
    return this.http.delete(this.baseURL + 'users/' + id);
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(this.baseURL + 'users/' + id);
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseURL + 'users');
  }
}
