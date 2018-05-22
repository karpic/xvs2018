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
export class ReservationsService {
  private url = 'http://localhost:8080/api/reservation';

  getMyReservations(): Observable<any> {
    return this.http.get<any>(this.url+'/myreservations', httpOptions);
  }

  reserve(reservation: ReservationCreation): Observable<any> {
    console.log(reservation);
    return this.http.post<any>(this.url+'/reserve', reservation, httpOptions).pipe(
      catchError(this.handleError<any>('reserve'))
    );
  }

  cancelReservation(id: number) {
    return this.http.delete<any>(this.url+'/cancel?id='+id, httpOptions).pipe(
      catchError(this.handleError<any>('cancelReservation'))
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
