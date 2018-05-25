import { Component, OnInit, Input } from '@angular/core';
import { ReservationView } from '../../../models/reservationView.model';

@Component({
  selector: 'app-reservation-confirmation-page',
  templateUrl: './reservation-confirmation-page.component.html',
  styleUrls: ['./reservation-confirmation-page.component.css']
})
export class ReservationConfirmationPageComponent implements OnInit {

  @Input() reservation: ReservationView;

  constructor() { }

  ngOnInit() {
  }

}
