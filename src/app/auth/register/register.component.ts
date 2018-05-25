import { UserView } from './../../models/userView.model';
import { UserCreation } from './../../models/userCreation.model';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsersService } from '../../services/users.service';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  newUser: UserCreation = new UserCreation('','','','','', new Date());
  registeredUser: UserView;
  registered: boolean;

  onRegisterFormSubmit(forma: NgForm) {
    this.newUser.firstName = forma.value.firstname;
    this.newUser.lastName = forma.value.lastname;
    this.newUser.email = forma.value.email;
    this.newUser.username = forma.value.username;
    this.newUser.password = forma.value.password;

    this.authService.registerUser(this.newUser).subscribe(
      (registeredUser) => {
        this.registeredUser = registeredUser;
        this.registered = true;
      }
    );
    //this.router.navigate(['login']);
  }

  resetForm(forma: NgForm) {
    forma.reset();
  }

  constructor(
    private usersService: UsersService,
    private authService: AuthService,
    private router: Router
  ) {
    this.registered = false;
   }

  ngOnInit() {
  }

}
