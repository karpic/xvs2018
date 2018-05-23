import { UserImpressionService } from './../../services/userImpression.service';
import { UserImpressionCreation } from './../../models/userImpressionCreation.model';
import { DataService } from './../../services/dataService.service';
import { Component, OnInit } from '@angular/core';
import { ReservationView } from '../../models/reservationView.model';
import { Location } from '@angular/common';

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
      }
    )
  }

  updateStarNumber(star: number) {
    this.starNumber = star;
  }

  createReview() {
    this.userImpressionCreation.accommodationId = this.reservationView.accommodationId;
    this.userImpressionCreation.rating = this.starNumber;
    this.userImpressionService.insertUserImpression(this.userImpressionCreation).subscribe();
    this.location.back();
  }

  constructor(
    private dataService: DataService,
    private userImpressionService: UserImpressionService,
    private location: Location
  ) { }

  ngOnInit() {
    this.getReservationView();
  }

}
