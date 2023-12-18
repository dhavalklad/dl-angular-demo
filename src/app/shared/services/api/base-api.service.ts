import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from "@angular/common/http";
import {inject, Injectable} from "@angular/core";
import {SuccessResponse} from "../../models/auth";
import {catchError, map} from "rxjs";
@Injectable({providedIn:'root'})
export class BaseApiService {

  //setup app for different environment

  private baseURL = 'http://localhost:8080/api/';


  //inject HTTP client
  constructor(public http: HttpClient) {
  }


  //write HTTP get, post, put and delete methods

  get<T>(path: string, queryString?: HttpParams, header?: HttpHeaders) {

    return this.http.get<SuccessResponse<T>>(this.baseURL + path, {params: queryString, headers: header}).pipe(
      map(data => data.data),
      catchError(this.handleHTTPError())
    );
  }

  post<T>(path: string, data: any, queryString?: HttpParams) {

    return this.http.post<SuccessResponse<T>>(this.baseURL + path, data, {params: queryString}).pipe(
      map(data => data.data),
      catchError(this.handleHTTPError())
    );
  }

  put<T>(path: string, data: any, queryString?: HttpParams) {

    return this.http.put<SuccessResponse<T>>(this.baseURL + path, data, {params: queryString,observe:"response"}).pipe(
      map(data => data.body?.data),
      catchError(this.handleHTTPError())
    );
  }


  delete<T>(path: string, queryString?: HttpParams) {

    return this.http.delete<SuccessResponse<T>>(this.baseURL + path, {params: queryString}).pipe(
      map(data => data.data),
      catchError(this.handleHTTPError())
    );
  }


  handleHTTPError() {
    return (err: HttpErrorResponse) => {
      let error_msg = 'unknown error occurred';
      if (err.status === 401) {
        error_msg = err.error.message;
      }
      // throw error_msg;
      throw new Error(error_msg);
    }
  }
}
