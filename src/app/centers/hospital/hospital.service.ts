import { Injectable } from '@angular/core';
import {Headers, Http} from '@angular/http';
import {Observable} from 'rxjs';
import {Hospital} from './hospital';
import {AuthenticateService} from '../../authenticate/authenticate.service';


@Injectable()
export class HospitalService {
  headers = new Headers({
    'Content-Type' : 'application/json',
    'Authorization': this.authservice.getToken()
  });
  serverUrl = 'http://localhost:3000/api';
  constructor(private  http: Http, private authservice: AuthenticateService) { }

  getHospitals(): Observable<Hospital[]> {
    // const url = this.serverUrl + '/hospitals';
    // const url = 'http://localhost:3000/api/hospitals';
    const branch = this.authservice.getCurrentUser().branchid;
    const  url = this.serverUrl + '/branches/' + branch + '/hospitals';
    return this.http.get(url, {headers: this.headers}).map(res => res.json()).catch(err => {
      return Observable.throw(err);
    });
  }

  createHospital(hospital: Hospital): Observable<any> {
    // const  url = this.serverUrl + '/hospitals';
    const branch = this.authservice.getCurrentUser().branchid;
    const  url = this.serverUrl + '/branches/' + branch + '/hospitals';
    return this.http.post(url, hospital, { headers: this.headers }).map(res => res.json()).catch(err => {

      return Observable.throw(err);

    });
  }
  updateHospital(hospital: Hospital): Observable<any> {
    // const  url = this.serverUrl + '/hospitals/' + hospital.id;
    const branch = this.authservice.getCurrentUser().branchid;
    const  url = this.serverUrl + '/branches/' + branch + '/hospitals/' + hospital.id;
    return this.http.put(url, hospital, { headers: this.headers }).map(res => res.json()).catch(err => {
      return Observable.throw(err);

    });
  }

  deleteHospital(id: String): Observable<Hospital[]> {
    const  url = this.serverUrl + '/hospitals/' + id;
    return this.http.delete(url, { headers: this.headers }).map(res => res.json()).catch(err => {
      return Observable.throw(err);

    });
  }


}
