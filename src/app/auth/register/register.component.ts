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
  newUser: UserCreation = new UserCreation('', '', '', '', '', new Date());
  registeredUser: UserView;
  registered: boolean;
  public strength = 0;
  public passwordStrong = false;
  public barLabel = 'Password strength:';
  public strengthLabels = ['(Useless)', '(Weak)', '(Normal)', '(Strong)', '(Great!)'];
  public myColors = ['#DD2C00', '#FF6D00', '#FFD600', '#AEEA00', '#00C853'];
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
   onPasswordChange(event) {
    if (event > 30) {
      this.passwordStrong = true;
    } else {
      this.passwordStrong = false;
    }
    this.strength = event;
   }
  ngOnInit() {
  }

}
