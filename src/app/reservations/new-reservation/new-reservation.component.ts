import { DateParser } from './../../services/dateParser.service';
import { DataService } from './../../services/dataService.service';
import { ReservationCreation } from './../../models/reseravtionCreation.model';
import { ReservationsService } from './../../services/reservations.service';
import { AccommodationView } from './../../models/accommodationView.model';
import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ReservationView } from '../../models/reservationView.model';

@Component({
  selector: 'app-new-reservation',
  templateUrl: './new-reservation.component.html',
  styleUrls: ['./new-reservation.component.css']
})
export class NewReservationComponent implements OnInit {
  accommodation: AccommodationView;
  newReservation: ReservationCreation = new ReservationCreation(undefined, new Date(), new Date());
  createdReservation: ReservationView;
  created: boolean;
  accommodationAvailable: boolean;

  getAccommodation() {
    this.dataService.currentAccommodationView.subscribe(
      acc => this.accommodation = acc
    );
  }

  onNewReservationSumbit(forma: NgForm) {
    this.newReservation.accommodationId = this.accommodation.id;
    console.log(this.newReservation);
    if(!this.rangesOverlap()){
      this.accommodationAvailable = true;
      this.reservationsService.reserve(this.newReservation).subscribe(
        (createdReservation) => {
          this.createdReservation = createdReservation;
          this.created = true;
        }
      );
    }
    else{
      this.accommodationAvailable = false;
    }

  }

  rangesOverlap(): boolean {
    //two date ranges overlap if:
    //(StartDate1 <= EndDate2) and (StartDate2 <= EndDate1)
    let retVal = false;

    for(let restriction of this.accommodation.restrictions) {
      //restriction je date2
      if( (this.dateParser.parseDateSimpleYearFirst(this.newReservation.startingDate.toString()) <= this.dateParser.parseDateSimple(restriction.restrictionTo.toString()))  && (this.dateParser.parseDateSimple(restriction.restrictionFrom.toString()) <= this.dateParser.parseDateSimpleYearFirst(this.newReservation.endingDate.toString()) ))
      {
        retVal = true;
      }
    }

    /* for(let reservation of this.accommodation.reservations) {
      if( (this.dateParser.parseDateSimpleYearFirst(this.newReservation.startingDate.toString()) <= this.dateParser.parseDateSimple(reservation.restrictionTo.toString()))  && (this.dateParser.parseDateSimple(reservation.restrictionFrom.toString()) <= this.dateParser.parseDateSimpleYearFirst(this.newReservation.endingDate.toString()) ))
      {
        retVal = true;
      }
    } */

    return retVal;
  }

  constructor(
    private reservationsService: ReservationsService,
    private dataService: DataService,
    private dateParser: DateParser
  ) {
    this.created = false;
    this.accommodationAvailable = true;
  }

  ngOnInit() {
    this.getAccommodation();
  }

}
