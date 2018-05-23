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
  username: string = "";
  password: string = "";

  onLoginFormSubmit(forma: NgForm) {
    this.authService.attemptAuth(this.username, this.password).subscribe(
      data => {
        this.token.saveToken(data.token);
        this.authService.toggleLoggedIn();
        window.sessionStorage.setItem('username', data.user.username);
        this.router.navigate(['search']);
      }
    )
  }


  constructor(
    private router: Router,
    private authService: AuthService,
    private token: TokenStorage,
  ) { }

  ngOnInit() {
  }

}
