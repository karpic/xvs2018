import {Component, OnInit, ViewChild} from '@angular/core';
import {AuthService} from '../../services/auth/auth.service';
import {TokenStorage} from '../../services/auth/token.storage';
import {NgForm} from '@angular/forms';
import {UserView} from '../../models/userView.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user-setting',
  templateUrl: './user-setting.component.html',
  styleUrls: ['./user-setting.component.css']
})
export class UserSettingComponent implements OnInit {
  username = '';
  message = '';
  error = '';
  @ViewChild('f') form: NgForm;
  public passwordStrong = false;
  public barLabel = 'Password strength:';
  public strengthLabels = ['(Useless)', '(Weak)', '(Normal)', '(Strong)', '(Great!)'];
  public myColors = ['#DD2C00', '#FF6D00', '#FFD600', '#AEEA00', '#00C853'];
  constructor(private tokenService: TokenStorage, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.username = this.tokenService.getUsername();
  }

  submit() {
    this.authService.changePassword(this.username, this.form.controls['old'].value, this.form.controls['new'].value).
    subscribe((resp: UserView) => {
      this.message = 'Password changed, please log in again';
      setTimeout(() => {
          this.authService.logout();
        }, 3000);
      }, error => {
      this.error = 'Password u entered is not correct. For security reasons you will be logged out.';
      setTimeout(() => {
        this.authService.logout();
      }, 3000);
    });
  }
  onPasswordChange(event) {
    if (event > 30) {
      this.passwordStrong = true;
    } else {
      this.passwordStrong = false;
    }
  }

}
