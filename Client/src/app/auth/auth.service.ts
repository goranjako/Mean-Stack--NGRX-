
import { Injectable, ErrorHandler } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import { User } from './user';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import  jwt_decode from 'jwt-decode';

import { retry, catchError } from 'rxjs/operators';
import {environment} from '../../environments/environment';
import { SwalService } from '../shared/swal.service';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userid:any;
  apiUrl = environment.apiUrl;
 constructor(private http: HttpClient, private toast: SwalService ) { }

 register(user:any): Observable<User> {
   return this.http.post<any>(this.apiUrl +'/register', user)
   .pipe(map(user => {
    console.log(user)
     // register successful if there's a jwt token in the response
     if (user && user.token) {
       // store user details and jwt token in local storage to keep user logged in between page refreshes
       localStorage.setItem('jwt', JSON.stringify(user));
     }
     return user;
   }));
 }

 login(authCredentials:any) {
   return this.http.post<any>(this.apiUrl +'/login', authCredentials)
     .pipe(map(user => {
       // login successful if there's a jwt token in the response
       if (user && user.token) {
         // store user details and jwt token in local storage to keep user logged in between page refreshes
         localStorage.setItem('jwt', JSON.stringify(user));
       }
       return user;
     }));
 }

 getUser(id:any): Observable<any> {
   return this.http.get<any>(this.apiUrl +'/todo' + id)
     .pipe(
       retry(1),
       catchError(this.errorHandl)
     );
 }

 logout() {
   // remove user from local storage to log user out
   localStorage.removeItem('jwt');
   this.toast.success( 'Logout Successful!');
 }


 getToken() {
   const token:any  = localStorage.getItem('jwt');
   const decode = jwt_decode(token);
   return decode;

 }

 public isLoggedIn() {
   return localStorage.getItem('jwt') !== null;

 }

 errorHandl(error:any) {
   let errorMessage = '';
   if (error.error instanceof ErrorEvent) {
     // Get client-side error
     errorMessage = error.error.message;
   } else {
     // Get server-side error
     errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
   }
   console.log(errorMessage);
   return throwError(errorMessage);
 }
}
