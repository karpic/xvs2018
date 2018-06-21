import { MessageCreation } from './../models/messageCreation.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable()
export class MessagesService {
  private url = 'http://localhost:8080/api/message/insert';

  //HEROKU
  private herokuUrl = 'https://warm-badlands-25076.herokuapp.com/api/message/insert';

  insertMessage(message: MessageCreation) {
    return this.http.post<any>(this.herokuUrl, message, httpOptions).pipe(
      catchError(this.handleError<any>('insertMessage'))
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
