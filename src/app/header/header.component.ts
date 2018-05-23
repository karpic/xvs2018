import { Router } from '@angular/router';
import { AuthService } from './../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';

const TOKEN_KEY = 'AuthToken';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  loggedIn: boolean;


  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  logout() {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.clear();
    this.authService.toggleLoggedIn();
    this.router.navigate(['login']);
  }

  ngOnInit() {
    if (sessionStorage.getItem(TOKEN_KEY) != null) {
      this.loggedIn = true;
    }

    this.authService.change.subscribe(isLoggedIn => {
      this.loggedIn = isLoggedIn;
      console.log(this.loggedIn)
    });
  }

}
