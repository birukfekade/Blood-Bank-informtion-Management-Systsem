import { Injectable } from '@angular/core';
import {Headers, Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Donationhistory} from './donate';
import {AuthenticateService} from '../../authenticate/authenticate.service';
import {Staff} from '../../user/staff/staff';


@Injectable()
export class DonateService {
  headers = new Headers({
    'Content-Type' : 'application/json',
    'Authorization': this.authservice.getToken()
  });
  serverUrl = 'http://localhost:3000/api';
  constructor(private  http: Http, private authservice: AuthenticateService) { }
  getActiveDonationCenter() {
    const branch = this.authservice.getCurrentUser().branchid;
    const url = this.serverUrl + '/branches/' + branch + '/donationcenters?filter={"where":{"status":"Online"}}';
    return this.http.get(url, {headers: this.headers}).map(res => res.json()).catch(err => {
      return Observable.throw(err);
    });
  }
  createDonate(donate: Donationhistory , donor: String): Observable<any> {
    // const donor = this.authservice.getCurrentUser().branchid;
    const  url = this.serverUrl + '/donors/' + donor + '/donationhistories';
    return this.http.post(url, donate, { headers: this.headers }).map(res => res.json()).catch(err => {

      return Observable.throw(err);

    });
  }
  // createDonate(donate: Donationhistory): Observable<any> {
  //   const  url = this.serverUrl + '/donationhistories';
  //   return this.http.post(url, donate, { headers: this.headers }).map(res => res.json()).catch(err => {
  //
  //     return Observable.throw(err);
  //
  //   });
  // }

}
