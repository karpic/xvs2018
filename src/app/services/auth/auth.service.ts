import { Injectable, EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { UserCreation } from '../../models/userCreation.model';
import {UserView} from '../../models/userView.model';
import {Router} from '@angular/router';

const TOKEN_KEY = 'AuthToken';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable()
export class AuthService {
  isLoggedIn: boolean;
  @Output() change: EventEmitter<boolean> = new EventEmitter();
  private baseurl = 'http://localhost:8085/api/auth';
  private url = '/login';
  private registerUrl = '/register';
  private changePassUrl = '/changepass';
  private resetPassUrl = '/resetpassword';

  // HEROKU
  private herokuBaseUrl = 'https://warm-badlands-25076.herokuapp.com/api/auth';

  constructor(private http: HttpClient, private router: Router) {
    this.url = this.herokuBaseUrl + this.url;
    this.registerUrl = this.herokuBaseUrl + this.registerUrl;
    this.changePassUrl = this.herokuBaseUrl + this.changePassUrl;
    this.resetPassUrl = this.herokuBaseUrl + this.resetPassUrl;
  }

  attemptAuth(ussername: string, password: string): Observable<any> {
    const credentials = {username: ussername, password: password};
    return this.http.post<any>(this.url, credentials);
  }

  registerUser(user: UserCreation) {
    return this.http.post<UserCreation>(this.registerUrl, user, httpOptions).pipe(
      catchError(this.handleError<any>('registerUser'))
    );
  }
  changePassword(username: string, oldPassword: string, newPassword: string) {
    const userchange = {username: username, oldPassword: oldPassword, newPassword: newPassword};
    return this.http.post<UserView>(this.changePassUrl, userchange, httpOptions);
  }
  requestResetPassword(email: string) {
    return this.http.get<UserView>(this.resetPassUrl + '?email=' + email, httpOptions);
  }
  resetPassword(hash: string, newPassword: string) {
    const passChange = {hash: hash, newPassword: newPassword};
    return this.http.post<UserView>(this.resetPassUrl, passChange, httpOptions);
  }
  checkIfLoggedIn(): boolean {
    return this.isLoggedIn;
  }

  toggleLoggedIn() {
    if (sessionStorage.getItem(TOKEN_KEY) != null) {
      this.isLoggedIn = true;
      this.change.emit(this.isLoggedIn);
    } else {
      this.isLoggedIn = false;
      this.change.emit(this.isLoggedIn);
    }
  }

  logout() {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.removeItem('username');
    window.sessionStorage.removeItem('userRole');
    window.sessionStorage.clear();
    this.toggleLoggedIn();
    this.router.navigate(['login']);
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption


      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
