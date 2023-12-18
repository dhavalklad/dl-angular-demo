import {HttpEvent, HttpEventType, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {exhaustMap, Observable, take, tap} from "rxjs";
import {Injectable} from "@angular/core";
import {AuthService} from "./auth.service";


//
@Injectable()
export class AuthTokenInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return this.authService.authUser.pipe(
      take(1),
      exhaustMap((data) => {
        if (!data) {
          console.log('interceptor user data is not available');
          return next.handle(req);
        }
        const newRequest = req.clone({
          headers: new HttpHeaders().set('Authorization', 'Bearer ' + data.token)
        });
        console.log('interceptor user data is available');
        return next.handle(newRequest);
      })
    );
  }

}
