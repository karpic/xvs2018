import { AccommodationService } from './../../services/accommodation.service';
import { AccommodationView } from './../../models/accommodationView.model';
import { MessagesService } from './../../services/messages.service';
import { MessageCreation } from './../../models/messageCreation.model';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { DataService } from './../../services/dataService.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
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
  newMessage: MessageCreation = new MessageCreation('', '', 0);
  accommodation: AccommodationView = null;

  @ViewChild('messageBox') messageBox: ElementRef;

  getMessages() {
    this.dataService.currentReservationView.subscribe(
      reservation => {
        this.reservationView = reservation;
        this.messages = reservation.messages;
        this.getAccommodation();
        console.log(this.accommodation);
        //sortinranje poruka po datumu
        this.messages.sort(
          (a, b) => new Date(this.parseDate(a.dateSent.toString())).getTime() - new Date(this.parseDate(b.dateSent.toString())).getTime()
        )
      }
    )
  }

  parseDate(dateString: string): Date {
    var yearArray: string[] = dateString.split(" ")[0].split("-");
    var returnDate = new Date();
    returnDate.setDate(+yearArray[0]);
    returnDate.setMonth(+yearArray[1]);
    returnDate.setFullYear(+yearArray[2]);

    var timeArray: string[] = dateString.split(" ")[1].split(":");
    returnDate.setHours(+timeArray[0]);
    returnDate.setMinutes(+timeArray[1]);
    returnDate.setSeconds(+timeArray[2]);

    return returnDate;
  }

  sendMessage() {
    this.newMessage.reservationId = this.reservationView.id;
    //Kako da nam kome saljem poruku
    /* let username = '';
    if (this.messages[0].fromUserUsername == this.reservationView.registeredUserUsername) {
      username = this.messages[0].toUserUsername;
    }
    else {
      username = this.messages[0].fromUserUsername;
    } */
    this.newMessage.toUserUsername = this.accommodation.agentUsername;
    console.log(this.accommodation.agentUsername);
    this.messagesService.insertMessage(this.newMessage).subscribe(
      (createdMessage) => {
        this.messages.push(createdMessage);
        this.messageBox.nativeElement.value = '';
      }
    );
  }

  getAccommodation() {
    this.accommodationService.getOne(this.reservationView.accommodationId).subscribe(
      (response) => this.accommodation = response
    );
  }

  constructor(
    private dataService: DataService,
    private messagesService: MessagesService,
    private accommodationService: AccommodationService
  ) { }

  ngOnInit() {
    this.getMessages();

  }

}
