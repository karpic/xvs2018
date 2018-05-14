import { DataService } from './../../services/dataService.service';
import { ReservationCreation } from './../../models/reseravtionCreation.model';
import { ReservationsService } from './../../services/reservations.service';
import { AccommodationView } from './../../models/accommodationView.model';
import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-new-reservation',
  templateUrl: './new-reservation.component.html',
  styleUrls: ['./new-reservation.component.css']
})
export class NewReservationComponent implements OnInit {
  accommodation: AccommodationView;
  newReservation: ReservationCreation = new ReservationCreation(undefined, new Date(), new Date());

  getAccommodation() {
    this.dataService.currentAccommodationView.subscribe(
      acc => this.accommodation = acc
    );
  }

  onNewReservationSumbit(forma: NgForm) {
    this.newReservation.accommodationId = this.accommodation.id;
    this.reservationsService.reserve(this.newReservation).subscribe();
  }

  constructor(
    private reservationsService: ReservationsService,
    private dataService: DataService
  ) { }

  ngOnInit() {
    this.getAccommodation();
  }

}
