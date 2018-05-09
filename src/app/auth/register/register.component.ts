import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  onRegisterFormSubmit(forma: NgForm) {

  }

  resetForm(forma: NgForm) {
    forma.reset();
  }

  constructor() { }

  ngOnInit() {
  }

}
