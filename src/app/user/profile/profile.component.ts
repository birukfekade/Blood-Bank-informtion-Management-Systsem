import { Component, OnInit } from '@angular/core';
import {User} from '../../authenticate/user';
import {AuthenticateService} from '../../authenticate/authenticate.service';
import {BloodstockService} from '../../stock/bloodstock/bloodstock.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [AuthenticateService, BloodstockService]
})
export class ProfileComponent implements OnInit {
  user: User = new User();
  public oldPwd: string;
  public newPwd: string;
  public confirmPwd: string;

public emaild;
  constructor(private  authService: AuthenticateService) { }


  ngOnInit() {
    this.user = this.authService.getCurrentUser();
  }


  onReset() {
    if (this.oldPwd != null && this.newPwd != null && this.confirmPwd !=  null) {

if (this.newPwd === this.confirmPwd) {
  this.authService.changePassword(this.oldPwd, this.newPwd).subscribe(res => {

    // this.router.navigate( ['/staff'] );
    // console.log(res.id);
    console.log('Yes');

  }, err => {
    // console.log( err );
    console.log('No');
    // this.errorMessage = 'An Error Saving the Post';
  });
}

    }
  }
    // this.authService.changePassword();
  // }

}
