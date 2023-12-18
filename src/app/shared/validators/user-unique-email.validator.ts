import {AbstractControl, AsyncValidatorFn, ValidationErrors} from "@angular/forms";
import {UsersService} from "../services/api/users.service";
import {catchError, exhaustMap, map, Observable, of, switchMap, tap} from "rxjs";
import {inject} from "@angular/core";

export function userUniqueEmailValidator( userService: UsersService, userId?: number | null,): AsyncValidatorFn {


    return (control: AbstractControl): Observable<ValidationErrors | null> => {
        // understand DI context and why it is not working
        // const authService = inject(AuthService);
        // const userService = inject(UsersService);
        console.log('async validator called', control);

        // use injector service
        // const test = injector.get(AuthService);

        // const tPromise = new Promise<any>((resolve, reject) => {
        //   setTimeout(() => {
        //     if (control.value.length > 15) {
        //
        //       resolve({isEmailExist: true});
        //     } else {
        //       resolve(null);
        //     }
        //   }, 3000);
        //
        // })
        // return tPromise;


        return userService.checkUniqueEmail(control.value, userId).pipe(
            tap((data) => console.log('user service tap called')),
            map((data) => {
                return data.isEmailExist ? {isEmailExist: true} : null;
            }),
            tap((data) => console.log('after map', data)),
            catchError((error) => of(null))
        );


        // return authService.authUser.pipe(
        //     tap((data) => console.log('auth service tap called')),
        //     map((data) => {
        //             console.log('map called');
        //             let userId = null;
        //             if (data && data.userId) {
        //                 userId = data.userId;
        //             }
        //             // return userService.checkUniqueEmail(control.value, userId).pipe(
        //             // tap((data) => console.log('user service tap called')),
        //             // map((data) => {
        //             //   return data.isEmailExist ? {isEmailExist: true} : null;
        //             // }),
        //             // tap((data) => console.log('after map', data)),
        //             // catchError((error) => of(null))
        //             // );
        //             // return of(null);
        //
        //             if (control.value.length > 15) {
        //                 return {isEmailExist: true};
        //             } else {
        //                 return null;
        //             }
        //         }
        //     ),
        //     tap((data) => console.log('user service tap called')),
        //     // map((data) => {
        //     //     return data.isEmailExist ? {isEmailExist: true} : null;
        //     // }),
        //     tap((data) => console.log('after map', data)),
        //     catchError((error) => of(null))
        // );

    }
}
