import { UserImpressionCreation } from './../../models/userImpressionCreation.model';
import { DataService } from './../../services/dataService.service';
import { Component, OnInit } from '@angular/core';
import { ReservationView } from '../../models/reservationView.model';

@Component({
  selector: 'app-user-impression',
  templateUrl: './user-impression.component.html',
  styleUrls: ['./user-impression.component.css']
})
export class UserImpressionComponent implements OnInit {
  reservationView: ReservationView;
  userImpressionCreation: UserImpressionCreation = new UserImpressionCreation(0, "", 0);
  starNumber: number;

  getReservationView() {
    this.dataService.currentReservationView.subscribe(
      reservation => {
        this.reservationView = reservation;
        console.log(this.reservationView);
      }
    )
  }

  updateStarNumber(star: number) {
    this.starNumber = star;
    console.log(this.starNumber);
  }

  createReview() {
    this.userImpressionCreation.accommodationId = this.reservationView.accommodationId;
    this.userImpressionCreation.rating = this.starNumber;
  }

  constructor(
    private dataService: DataService
  ) { }

  ngOnInit() {
    this.getReservationView();
  }

}
