import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import {AuthenticateService} from '../../authenticate/authenticate.service';
// import {Observable} from 'rxjs/Observable';
import { Observable } from 'rxjs';
import {Donationcenter} from './donationcenter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Staff} from '../../user/staff/staff';


@Injectable()
export class DonationcenterService {
  headers = new Headers({
    'Content-Type' : 'application/json',
    'Authorization': this.authservice.getToken()
  });
  serverUrl = 'http://localhost:3000/api';
  constructor(private  http: Http, private authservice: AuthenticateService) { }

  getDonationcenters(): Observable<Donationcenter[]> {
    // const url = this.serverUrl + '/donationcenters';
    // const url = 'http://localhost:3000/api/donationcenters';
    const branch = this.authservice.getCurrentUser().branchid;
    const  url = this.serverUrl + '/branches/' + branch + '/donationcenters';
    return this.http.get(url, {headers: this.headers}).map(res => res.json()).catch(err => {
      return Observable.throw(err);
    });
  }

  createDonationcenter(donationcenter: Donationcenter): Observable<any> {
    const branch = this.authservice.getCurrentUser().branchid;
    const  url = this.serverUrl + '/branches/' + branch + '/donationcenters';
    // const  url = this.serverUrl + '/donationcenters';
    return this.http.post(url, donationcenter, { headers: this.headers }).map(res => res.json()).catch(err => {

      return Observable.throw(err);

    });
  }
  updateDonationcenter(dc: Donationcenter): Observable<any> {
    const branch = this.authservice.getCurrentUser().branchid;
    const  url = this.serverUrl + '/branches/' + branch + '/donationcenters/' + dc.id;
    return this.http.put(url, dc, { headers: this.headers }).map(res => res.json()).catch(err => {
      return Observable.throw(err);

    });
  }


  deleteDonationcenter(id: String): Observable<Donationcenter[]> {
    const  url = this.serverUrl + '/donationcenters/' + id;
    return this.http.delete(url, { headers: this.headers }).map(res => res.json()).catch(err => {
      return Observable.throw(err);

    });
  }

}
