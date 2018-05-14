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
export class AccommodationService {
  private url = 'http://localhost:8080/api/accommodation/all?search';

  findOne(id: number): Observable<any>{
    return this.http.get<any>(this.url+'=id:'+id, httpOptions);
  }

  simpleSearch(location: string, numOfPeople: number): Observable<any> {
    return this.http.get<any>(this.url+'=location:' + location +',capacity:'+numOfPeople + '&page=0&size=10&sort=name,desc', httpOptions);
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
