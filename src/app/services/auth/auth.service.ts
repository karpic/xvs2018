import { Injectable, EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { UserCreation } from '../../models/userCreation.model';

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

  private url = 'http://localhost:8080/api/auth/login';
  private registerUrl = 'http://localhost:8080/api/auth/register';

  //HEROKU
  private herokuUrl = 'https://warm-badlands-25076.herokuapp.com/api/auth/login';
  private herokuRegisterUrl = 'https://warm-badlands-25076.herokuapp.com/api/auth/register';

  constructor(private http: HttpClient) {
    //this.isLoggedIn = false;
   }

  attemptAuth(ussername: string, password: string): Observable<any> {
    const credentials = {username: ussername, password: password};
    console.log('attempAuth ::');
    return this.http.post<any>(this.herokuUrl, credentials);
  }

  registerUser(user: UserCreation) {
    return this.http.post<UserCreation>(this.herokuRegisterUrl, user, httpOptions).pipe(
      catchError(this.handleError<any>('registerUser'))
    );
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
