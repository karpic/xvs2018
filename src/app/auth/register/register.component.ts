import { UserCreation } from './../../models/userCreation.model';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  newUser: UserCreation = new UserCreation('','','','','', new Date());


  onRegisterFormSubmit(forma: NgForm) {
    this.newUser.firstName = forma.value.firstname;
    this.newUser.lastName = forma.value.lastname;
    this.newUser.email = forma.value.email;
    this.newUser.username = forma.value.username;
    this.newUser.password = forma.value.password;

    //TO DO: zahtev na server
  }

  resetForm(forma: NgForm) {
    forma.reset();
  }

  constructor(
    private usersService: UsersService
  ) { }

  ngOnInit() {
  }

}
