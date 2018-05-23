import { MessagesService } from './../../services/messages.service';
import { MessageCreation } from './../../models/messageCreation.model';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { DataService } from './../../services/dataService.service';
import { Component, OnInit, ViewChild } from '@angular/core';
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
  newMessage: MessageCreation = new MessageCreation('','',0);
  //@ViewChild('messageBox') messageBox
  getMessages() {
    this.dataService.currentReservationView.subscribe(
      reservation => {
        this.reservationView = reservation;
        this.messages = reservation.messages;

        //sortinranje poruka po datumu

      }
    )
  }

  sendMessage() {
    this.newMessage.reservationId = this.reservationView.id;
    //Kako da nam kome saljem poruku
    let username = '';
    if(this.messages[0].fromUserUsername==this.reservationView.registeredUserUsername){
      username = this.messages[0].toUserUsername;
    }
    else{
      username = this.messages[0].fromUserUsername;
    }
    this.newMessage.toUserUsername = username;
    this.messagesService.insertMessage(this.newMessage).subscribe(
      (createdMessage) => {
        this.messages.push(createdMessage);
      }
    );
  }

  constructor(
    private dataService: DataService,
    private messagesService: MessagesService
  ) { }

  ngOnInit() {
    this.getMessages();
  }

}
