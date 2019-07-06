import { Component, OnInit } from '@angular/core';
import {User} from './user';
import {AuthenticateService} from './authenticate.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-authenticate',
  templateUrl: './authenticate.component.html',
  styleUrls: ['./authenticate.component.css'],
  providers: [AuthenticateService]
})
export class AuthenticateComponent implements OnInit {


public active = false;
user: User = new User();
  constructor(private authenticateservice: AuthenticateService,
  private  router: Router) { }

  ngOnInit() {
  }

  onLogin() {
   // console.log('Login Tapped', this.user);

   const user = this.user;
   this.authenticateservice.login(user.username, user.password).subscribe(response => {
// save the cookie
//  const currentuser = response.user;
//      const userid =  response.user.id;
     // this.user.id = userid.btoa();
       // console.log(userid.id);
this.authenticateservice.setUser(response.user);

const  token = response.id;
this.authenticateservice.setToken(token);
// Routing
     this.router.navigate(['/dashboard']);
   },
     err => {
       this.active = true;
       // final

     console.log(err);
     }
     );
  }

}
