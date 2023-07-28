import {HttpClient} from "@angular/common/http";
import {inject} from "@angular/core";

export class BaseApiService {

  //setup app for different environment

  protected baseURL = 'http://localhost:3000/';

  protected http!: HttpClient;

  constructor() {
    // resolve dependencies manually.
    this.http = inject(HttpClient);
  }
}
