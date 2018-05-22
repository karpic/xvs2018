import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { DataService } from './../../services/dataService.service';
import { Component, OnInit } from '@angular/core';
import { MessageView } from '../../models/messageView.model';
import { ReservationView } from '../../models/reservationView.model';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  messages: MessageView[];
  reservationView: ReservationView;

  getMessages() {
    this.dataService.currentReservationView.subscribe(
      reservation => {
        this.reservationView = reservation;
        this.messages = reservation.messages;
      }
    )
  }

  constructor(
    private dataService: DataService
  ) { }

  ngOnInit() {
    this.getMessages();
  }

}
