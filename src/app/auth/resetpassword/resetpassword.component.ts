import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Params} from '@angular/router/src/shared';
import {AuthService} from '../../services/auth/auth.service';
import {NgForm} from '@angular/forms';
import {UserView} from '../../models/userView.model';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit {
  hash: string;
  public message: string;
  public error = '';
  public passwordStrong = false;
  public barLabel = 'Password strength:';
  public strengthLabels = ['(Useless)', '(Weak)', '(Normal)', '(Strong)', '(Great!)'];
  public myColors = ['#DD2C00', '#FF6D00', '#FFD600', '#AEEA00', '#00C853'];
  @ViewChild('f') form: NgForm;
  constructor(private route: ActivatedRoute, private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.route.queryParams.subscribe(
      (resp: Params) => {
        this.hash = resp['hash'];
      }, error1 => {
        this.router.navigate(['/login']);
      }
    );
  }
  submit() {
    this.authService.resetPassword(this.hash, this.form.controls['password'].value).subscribe((resp: UserView) => {
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
