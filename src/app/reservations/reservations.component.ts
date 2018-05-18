import { MockDataService } from './../services/mockdata/mockdata.service';
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

  getReservationsMock() {
    this.mockData.getMyReservations().subscribe(
      (response) => this.reservationsList = response
    )
    console.log(this.reservationsList);
  }

  constructor(
    private reservationsService: ReservationsService,
    private mockData: MockDataService
  ) { }

  ngOnInit() {
    //this.getReservationsForLoggedInUser();
    this.getReservationsMock();
  }

}
