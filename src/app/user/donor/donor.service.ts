import { Injectable } from '@angular/core';
import {Headers, Http} from '@angular/http';
import {AuthenticateService} from '../../authenticate/authenticate.service';
import {Donor} from './donor';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class DonorService {
  headers = new Headers({
    'Content-Type' : 'application/json',
    'Authorization': this.authservice.getToken()
  });
serverUrl = 'http://localhost:3000/api';
  constructor(private http: Http, private authservice: AuthenticateService) { }

  getDonors(): Observable<Donor[]> {
    const url = this.serverUrl + '/donors';
    return this.http.get(url, {headers: this.headers}).map(res => res.json()).catch(err => {
      return Observable.throw(err);
    });
  }

  createDonor(donor: Donor): Observable<any> {
    const  url = this.serverUrl + '/donors';
    return this.http.post(url, donor, { headers: this.headers }).map(res => res.json()).catch(err => {

      return Observable.throw(err);

    });
  }
  updateDonor(donor: Donor): Observable<any> {
    const  url = this.serverUrl + '/donors/' + donor.id;
    return this.http.put(url, donor, { headers: this.headers }).map(res => res.json()).catch(err => {
      return Observable.throw(err);

    });
  }

  deleteDonor(id: String): Observable<Donor[]> {
    const  url = this.serverUrl + '/donors/' + id;
    return this.http.delete(url, { headers: this.headers }).map(res => res.json()).catch(err => {
      return Observable.throw(err);

    });
  }


}
