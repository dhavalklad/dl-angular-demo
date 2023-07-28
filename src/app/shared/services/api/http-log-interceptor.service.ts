import {HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable, tap} from "rxjs";


//
export class HttpLogInterceptorService implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        //log request URL with payload
        console.log('URL: ', req.url)

        // forward the request for further handling
        return next.handle(req)
            .pipe(
                tap((event) => {
                    // log the response data.
                    if (event.type === HttpEventType.Response) {
                        console.log('response body', event.body)
                    }
                })
            );
    }

}
