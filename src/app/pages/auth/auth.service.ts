import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User, UserResponse } from '@shared/models/user.interface';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '@env/environment';
import {JwtHelperService} from '@auth0/angular-jwt'
import { Router } from '@angular/router';
import { ThisReceiver } from '@angular/compiler';

const helper = new JwtHelperService();

@Injectable({
  providedIn: 'root',
})
export class AuthService {

private user = new BehaviorSubject<UserResponse|null>(null);

  private loggedIn = new BehaviorSubject<boolean>(false);
  
  constructor(private http: HttpClient, private _snackBar: MatSnackBar, private router: Router) {
    this.checkToken();
  }

  get user$(): Observable<UserResponse| null>{
    return this.user.asObservable();
  }

  get userValue(): UserResponse| null{
    return this.user.getValue();
  }

  get isLogged(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }


  logIn(authData: User): Observable<UserResponse | void> {
    return this.http.post<UserResponse>(`${environment.URL_API}/auth`, authData).pipe(
        map((user: UserResponse) => {
          this.saveLocalStorage(user);
          this.loggedIn.next(true);
          return user;
        }),
        catchError((err) => this.handleError(err))
      );
  }

  logout(): void {
    localStorage.removeItem("user");
    localStorage.removeItem("auth");
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }

  private checkToken(): void {
    const user = JSON.parse(String(localStorage.getItem("user"))) || null;
    if(user) {
      const isExpired = helper.isTokenExpired(user.token);
      if(isExpired){
        this.logout();
      } else {
        this.loggedIn.next(true);
      }
    }
  }

  private saveLocalStorage(user: UserResponse): void {
    const {cveUsuario, message,token, ...rest} = user;
    console.log(rest);
    localStorage.setItem("user", JSON.stringify(rest));
  }

  private handleError(err: any): Observable<never> {
    let errorMessage = 'Ocurrió un error';
    if (err) errorMessage = `Error: ${typeof err.error.message == 'undefined' ? err.message : err.error.message }`;

    this._snackBar.open(errorMessage, '', {
      duration: 6000,
    });
    return throwError(errorMessage);
  }
}
