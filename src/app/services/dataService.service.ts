import { AccommodationView } from './../models/accommodationView.model';
import { BehaviorSubject } from 'rxjs/BehaviorSubject'
import { NullAstVisitor } from '@angular/compiler';
export class DataService {
  private accommodationSource = new BehaviorSubject<AccommodationView>(null);
  currentAccommodationView = this.accommodationSource.asObservable();

  changeAccommodationView(accommodationView: AccommodationView){
    this.accommodationSource.next(accommodationView);
  }

  constructor(){}
}
