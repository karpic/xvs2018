import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from '../../../services/auth/auth.service';
import {UserView} from '../../../models/userView.model';

@Component({
  selector: 'app-forget',
  templateUrl: './forget.component.html',
  styleUrls: ['./forget.component.css']
})
export class ForgetComponent implements OnInit {
  @ViewChild('f') form: NgForm;
  public message = '';
  public error = '';
  constructor(private authService: AuthService) { }

  ngOnInit() {
  }
  submit() {
    this.authService.requestResetPassword(this.form.controls['email'].value).subscribe((resp: UserView) => {
      this.message = 'Password reset, please check you email.';
      setTimeout(() => {
        this.authService.logout();
      }, 3000);
    }, error => {
      this.error = 'Email you entered does not exists.';
    });
  }


}
