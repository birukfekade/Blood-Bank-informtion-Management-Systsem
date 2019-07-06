import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Staff} from '../../user/staff/staff';
import {Headers, Http} from '@angular/http';
import {AuthenticateService} from '../../authenticate/authenticate.service';
import {Branch} from '../../centers/branch/branch';
import {Hospital} from '../../centers/hospital/hospital';
import {Bloodstock} from '../../stock/bloodstock/bloodstock';
import {Donationcenter} from '../../centers/donationcenter/donationcenter';
import {Donationhistory} from '../../blood/donate/donate';
import {Transferblood} from '../../blood/transferblood/transferblood';


@Injectable()
export class DashboardService {
  headers = new Headers({
    'Content-Type' : 'application/json',
    'Authorization': this.authservice.getToken()
  });

  serverUrl = 'http://localhost:3000/api';

  constructor(private http: Http, private authservice: AuthenticateService) { }

  getStocks(): Observable<Bloodstock[]> {

    const  url = this.serverUrl + '/stocks/count';
    return this.http.get(url, {headers: this.headers}).map(res => res.json()).catch(err => {
      return Observable.throw(err);
    });
  }
  getDonationCenters(): Observable<Donationcenter[]> {

    const  url = this.serverUrl + '/donationcenters/count';
    return this.http.get(url, {headers: this.headers}).map(res => res.json()).catch(err => {
      return Observable.throw(err);
    });
  }
  getDonationHistories(): Observable<Donationhistory[]> {

    const  url = this.serverUrl + '/donationhistories/count';
    return this.http.get(url, {headers: this.headers}).map(res => res.json()).catch(err => {
      return Observable.throw(err);
    });
  }
  getTransfers(): Observable<Transferblood[]> {

    const  url = this.serverUrl + '/transfers/count';
    return this.http.get(url, {headers: this.headers}).map(res => res.json()).catch(err => {
      return Observable.throw(err);
    });
  }
  getDonor(): Observable<Donationhistory[]> {

    const  url = this.serverUrl + '/donors/count';
    return this.http.get(url, {headers: this.headers}).map(res => res.json()).catch(err => {
      return Observable.throw(err);
    });
  }


  getStaffs(): Observable<Staff[]> {

    const  url = this.serverUrl + '/staffs/count';
    return this.http.get(url, {headers: this.headers}).map(res => res.json()).catch(err => {
      return Observable.throw(err);
    });
  }
  getBranches(): Observable<Branch[]> {
    const  url = this.serverUrl + '/branches/count';
    return this.http.get(url, {headers: this.headers}).map(res => res.json()).catch(err => {
      return Observable.throw(err);
    });
  }
  // getDonors(): Observable<Donors[]> {

  //   const  url = this.serverUrl + '/donors/count';
  //   return this.http.get(url, {headers: this.headers}).map(res => res.json()).catch(err => {
  //     return Observable.throw(err);
  //   });
  // }
  getHospitals(): Observable<Hospital[]> {

    const  url = this.serverUrl + '/hospitals/count';
    return this.http.get(url, {headers: this.headers}).map(res => res.json()).catch(err => {
      return Observable.throw(err);
    });
  }

}
