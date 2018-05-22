import { ReservationView } from './../models/reservationView.model';
import { AccommodationView } from './../models/accommodationView.model';
import { BehaviorSubject } from 'rxjs/BehaviorSubject'
import { NullAstVisitor } from '@angular/compiler';
export class DataService {
  private accommodationSource = new BehaviorSubject<AccommodationView>(null);
  currentAccommodationView = this.accommodationSource.asObservable();

  private reservationViewSource = new BehaviorSubject<ReservationView>(null);
  currentReservationView = this.reservationViewSource.asObservable();

  changeAccommodationView(accommodationView: AccommodationView){
    this.accommodationSource.next(accommodationView);
  }

  changeReservationView(reservationView: ReservationView) {
    this.reservationViewSource.next(reservationView);
  }

  constructor(){}
}
