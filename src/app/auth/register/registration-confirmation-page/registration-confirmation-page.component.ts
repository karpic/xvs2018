import { Component, OnInit, Input } from '@angular/core';
import { UserView } from '../../../models/userView.model';

@Component({
  selector: 'app-registration-confirmation-page',
  templateUrl: './registration-confirmation-page.component.html',
  styleUrls: ['./registration-confirmation-page.component.css']
})
export class RegistrationConfirmationPageComponent implements OnInit {

  @Input() registeredUser: UserView;

  constructor() { }

  ngOnInit() {
  }

}
