import { ReservationView } from './../../models/reservationView.model';
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
export class MockDataService {

  getMyReservations(): Observable<ReservationView[]> {
    let retVal = [];
    let reservation1 = new ReservationView(1, "Hotel 1", "randomusername", new Date(), new Date(), true, []);
    let reservation2 = new ReservationView(2, "Hotel 2", "randomusername", new Date(), new Date(), true, []);
    let reservation3 = new ReservationView(3, "Hotel 3", "randomusername", new Date(), new Date(), true, []);
    retVal.push(reservation1);
    retVal.push(reservation2);
    retVal.push(reservation3);
    return of(retVal);
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
