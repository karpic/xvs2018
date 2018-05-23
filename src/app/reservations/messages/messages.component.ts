import { MessagesService } from './../../services/messages.service';
import { MessageCreation } from './../../models/messageCreation.model';
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
  newMessage: MessageCreation;

  getMessages() {
    this.dataService.currentReservationView.subscribe(
      reservation => {
        this.reservationView = reservation;
        this.messages = reservation.messages;
      }
    )
  }

  sendMessage() {
    this.newMessage.reservationId = this.reservationView.id;
    //Kako da nam kome saljem poruku
    //this.newMessage.toUserId =
  }

  constructor(
    private dataService: DataService,
    private messagesService: MessagesService
  ) { }

  ngOnInit() {
    this.getMessages();
  }

}
