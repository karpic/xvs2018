import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { TokenStorage } from '../../services/auth/token.storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username = '';
  password = '';
  public error = '';
  onLoginFormSubmit(forma: NgForm) {
    this.authService.attemptAuth(this.username, this.password).subscribe(
      data => {
        if (data['roles'].indexOf('ROLE_registered') === -1) {
          this.error = 'You are not registered user.';
          return;
        }
        this.token.saveToken(data['token']);
        this.authService.toggleLoggedIn();
        window.sessionStorage.setItem('username', data['username']);
        this.router.navigate(['search']);
      }, error => {
        this.error = 'Username or password is invalid.';
      }
    );
  }


  constructor(
    private router: Router,
    private authService: AuthService,
    private token: TokenStorage,
  ) { }

  ngOnInit() {
  }

}
