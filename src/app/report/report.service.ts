import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Bloodstock} from '../stock/bloodstock/bloodstock';
import {Headers, Http} from '@angular/http';
import {AuthenticateService} from '../authenticate/authenticate.service';
import {Report} from './report';
import {Donationcenter} from '../centers/donationcenter/donationcenter';

@Injectable()
export class ReportService {
  headers = new Headers({
    'Content-Type' : 'application/json',
    'Authorization': this.authservice.getToken()
  });
  serverUrl = 'http://localhost:3000/api';
  constructor(private http: Http, private authservice: AuthenticateService) { }


  createReport(report: Report): Observable<any> {
    const  url = this.serverUrl + '/histories';
    // const  url = this.serverUrl + '/donationcenters';
    return this.http.post(url, report, { headers: this.headers }).map(res => res.json()).catch(err => {

      return Observable.throw(err);

    });
  }

  getReports(): Observable<Report> {

    const  url = this.serverUrl + '/histories';
    return this.http.get(url, {headers: this.headers}).map(res => res.json()).catch(err => {
      return Observable.throw(err);
    });
  }

}
