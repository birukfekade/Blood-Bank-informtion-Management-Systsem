import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
// import {Observable} from 'rxjs/Observable';
import { Observable } from 'rxjs';
import {Donationcenter} from './post';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Injectable()
export class PostService {

  serverUrl = 'http://localhost:3000/api';
  constructor(private  http: Http) { }
    headers = new Headers({
  'Content-Type': 'application/json',
});
  getDonationcenters(): Observable<Donationcenter[]> {
    // const url = this.serverUrl + '/donationcenters';
    const url = 'http://localhost:3000/api/donationcenters';
    return this.http.get(url, {headers: this.headers}).map(res => res.json()).catch(err => {
      return Observable.throw(err);
    });
  }

  createDonationcenter(donationcenter: Donationcenter): Observable<any> {
    const  url = this.serverUrl + '/donationcenters';
    return this.http.post(url, donationcenter, { headers: this.headers }).map(res => res.json()).catch(err => {

      return Observable.throw(err);

    });
  }
  updateDonationcenter(dc: Donationcenter): Observable<any> {
    const  url = this.serverUrl + '/donationcenters/' + dc.id;
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
