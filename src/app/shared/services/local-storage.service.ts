import {Injectable} from "@angular/core";
import {AuthData} from "../models/auth";
import {AuthUser} from "../models/auth-user.model";

@Injectable({
  providedIn: "root"
})
export class LocalStorageService {

  setData(key: string, data: string) {
    localStorage.setItem(key, data);
  }

  getData(key: string) {
    return localStorage.getItem(key);
  }

  removeData(key: string) {
    localStorage.removeItem(key);
  }

  isDataAvailable(key: string) {
    let storageData = localStorage.getItem(key);
    return !!storageData;
  }

  setUser(user: AuthUser) {
    this.setData('user', JSON.stringify(user));
  }

  getUser(): AuthUser {
    const authUser: {
      _userId: number,
      _token: string,
      _tokenExpiresAt: string
    } = JSON.parse(this.getData('user') as string);

    return new AuthUser(authUser._userId, authUser._token, authUser._tokenExpiresAt);

  }

  isUserAvailable() {
    return this.isDataAvailable('user');
  }

  removeUser() {
    this.removeData('user');
  }

}
