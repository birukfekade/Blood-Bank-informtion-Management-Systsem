import { Injectable } from '@angular/core';
import {Headers} from '@angular/http';
import {AuthenticateService} from '../../authenticate/authenticate.service';

@Injectable()
export class NavbarService {
  headers = new Headers({
    'Content-Type' : 'application/json',
    'Authorization': this.authservice.getToken()
  });
  constructor(private authservice: AuthenticateService) { }

}
