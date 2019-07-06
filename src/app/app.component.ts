import { Component , OnInit } from '@angular/core';
import {User} from './authenticate/user';
import {AuthenticateService} from './authenticate/authenticate.service';
import {isNullOrUndefined} from 'util';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AuthenticateService]
})
export class AppComponent {
  user: User = new User();
  loggedIn: boolean = false;

currentrole ;
  constructor(private authservice: AuthenticateService ,
              private router: Router){

    // this.user = this.authservice.getCurrentUser();
    if (this.user || !isNullOrUndefined(this.user)) {
     // this.loggedIn = true;

    }  else {
      this.router.navigate(['/']);
    }
  }



logout() {
    this.loggedIn = false;
    this.authservice.logout();
}


}
