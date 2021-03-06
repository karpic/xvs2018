import { UserImpressionCreation } from './../models/userImpressionCreation.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { ReservationCreation } from '../models/reseravtionCreation.model';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable()
export class UserImpressionService {
  private url = 'http://localhost:8080/api/userimpression/insert';

  //HEROKU
  private herokuUrl = 'https://warm-badlands-25076.herokuapp.com/api/userimpression/insert';

  insertUserImpression(userImpression: UserImpressionCreation){
    return this.http.post<any>(this.herokuUrl, userImpression, httpOptions).pipe(
      catchError(this.handleError<any>('insertUserImpression'))
    );
  }


  constructor(
    private http: HttpClient
  ) { }

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
