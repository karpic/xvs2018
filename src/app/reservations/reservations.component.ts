import { ReservationView } from './../models/reservationView.model';
import { ReservationsService } from './../services/reservations.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.css']
})
export class ReservationsComponent implements OnInit {
  reservationsList: ReservationView[];

  getReservationsForLoggedInUser() {
    this.reservationsService.getMyReservations().subscribe(
      responseData => {
        this.reservationsList = responseData['content']
      }
    );
  }

  constructor(
    private reservationsService: ReservationsService
  ) { }

  ngOnInit() {
    this.getReservationsForLoggedInUser();
  }

}
