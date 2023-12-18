import {AuthData} from "./auth";

export class AuthUser {
  constructor(private _userId: number, private _token: string, private _tokenExpiresAt: string) {
  }

  set userId(userId: number) {
    this._userId = userId;
  }

  get token(): string {
    return this._token;
  }

  isTokenExpired(): boolean {
    return new Date().getTime() > new Date(this._tokenExpiresAt).getTime();
  }

}
